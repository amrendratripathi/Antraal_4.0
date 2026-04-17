import * as XLSX from "xlsx";
import JSZip from "jszip";

export interface StudentData {
  name: string;
  email: string;
  teamName?: string;
  teamMembers: string[];
  event: string;
  teamLeader: string;
}

export interface ParsedEventData {
  [teamLeader: string]: {
    email: string;
    teamName?: string;
    teamMembers: string[];
  };
}


/**
 * Detect column indices by analyzing header row
 */
function detectColumns(worksheet: XLSX.WorkSheet, range: any): {
  emailCol: number;
  teamNameCol: number;
  leaderCol: number;
  memberCols: number[];
  dataStartRow: number;
} {
  console.log("🔍 DETECTING COLUMNS...");
  
  let emailCol = -1;
  let teamNameCol = -1;
  let leaderCol = -1;
  let memberCols: number[] = [];

  // Read header row cells
  const headerRow = 0;
  const headerData: string[] = [];
  
  for (let col = 0; col <= Math.min(15, range.e.c); col++) {
    const headerCell = worksheet[XLSX.utils.encode_cell({ r: headerRow, c: col })];
    const headerText = headerCell?.v?.toString() || "";
    headerData.push(headerText);
    
    const colLetter = String.fromCharCode(65 + col);
    console.log(`  Header ${colLetter}(${col}): "${headerText}"`);

    // Detect columns
    const lowerText = headerText.toLowerCase();
    
    if (emailCol === -1 && lowerText.includes("email")) {
      emailCol = col;
      console.log(`    └─ DETECTED: Email column at ${col}`);
    }
    if (teamNameCol === -1 && lowerText.includes("team") && lowerText.includes("name") && !lowerText.includes("leader")) {
      teamNameCol = col;
      console.log(`    └─ DETECTED: Team Name column at ${col}`);
    }
    if (leaderCol === -1 && lowerText.includes("leader")) {
      leaderCol = col;
      console.log(`    └─ DETECTED: Leader column at ${col}`);
    }
    // Detect member columns (Member1, Member2, etc.) - more flexible detection
    if (lowerText.includes("member") || lowerText.includes("memeber") || 
        /\b(member|memeber)\s*\d+\b/i.test(lowerText) ||
        /\bteam\s*(member|memeber)\s*\d+\b/i.test(lowerText)) {
      memberCols.push(col);
      console.log(`    └─ DETECTED: Member column at ${col}`);
    }
  }

  // Handle different Excel structures
  if (emailCol === -1) emailCol = 0;
  
  // If no separate team name column found, use leader column as team name
  if (teamNameCol === -1) {
    teamNameCol = leaderCol !== -1 ? leaderCol : 1;
    console.log(`    └─ USING leader column as team name: ${teamNameCol}`);
  }
  
  if (leaderCol === -1) leaderCol = teamNameCol !== -1 ? teamNameCol : 2;

  // If no member columns detected, start after leader column
  const memberStartCol = memberCols.length > 0 ? Math.min(...memberCols) : leaderCol + 1;

  console.log(`\n✅ FINAL COLUMN MAP:`);
  console.log(`  Email: Column ${emailCol}`);
  console.log(`  Team Name: Column ${teamNameCol}`);
  console.log(`  Leader: Column ${leaderCol}`);
  console.log(`  Members: Columns [${memberCols.join(", ")}]`);

  return {
    emailCol,
    teamNameCol,
    leaderCol,
    memberCols,
    dataStartRow: 1,
  };
}

/**
 * Fetch and parse Excel file from public folder
 */
export async function parseExcelFile(fileName: string): Promise<ParsedEventData> {
  const response = await fetch(`/certificate/${encodeURIComponent(fileName)}`);
  const arrayBuffer = await response.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: "array" });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  
  const parsed: ParsedEventData = {};
  const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1");

  console.log("\n📊 ========== PARSING EXCEL ==========");
  console.log("File:", fileName);
  console.log("Rows:", range.e.r + 1, "Columns:", range.e.c + 1);
  
  // Detect columns automatically
  const cols = detectColumns(worksheet, range);
  
  console.log("\n📋 ========== READING DATA ROWS ==========");
  
  // Iterate through data rows
  for (let row = cols.dataStartRow; row <= range.e.r; row++) {
    try {
      const emailCell = worksheet[XLSX.utils.encode_cell({ r: row, c: cols.emailCol })];
      const teamNameCell = worksheet[XLSX.utils.encode_cell({ r: row, c: cols.teamNameCol })];
      const leaderCell = worksheet[XLSX.utils.encode_cell({ r: row, c: cols.leaderCol })];

      const email = emailCell?.v?.toString().trim() || "";
      const teamName = teamNameCell?.v?.toString().trim() || "";
      const teamLeader = leaderCell?.v?.toString().trim() || "";

      console.log(`\nRow ${row}:`);
      console.log(`  Email: "${email}"`);
      console.log(`  Team Name: "${teamName}"`);
      console.log(`  Leader: "${teamLeader}"`);

      // Skip if missing critical fields
      if (!email || !email.includes("@") || !teamLeader) {
        console.log(`  ❌ SKIP: Missing email or leader`);
        continue;
      }

      // Read team members - handle different column structures
      const teamMembers: string[] = [];
      
      // For Treasure Trail (6 columns), read member columns
      if (cols.memberCols.length > 0) {
        for (const col of cols.memberCols) {
          const memberCell = worksheet[XLSX.utils.encode_cell({ r: row, c: col })];
          const memberName = memberCell?.v?.toString().trim();
          if (memberName && !memberName.startsWith("http")) {
            teamMembers.push(memberName);
          }
        }
      } else {
        // For CloneCraft (2 columns), no separate member columns
        // Members would be handled differently if needed
      }

      console.log(`  Members: ${teamMembers.join(", ")}`);

      // Merge if leader already exists
      if (parsed[teamLeader]) {
        const existing = parsed[teamLeader];
        existing.teamMembers = Array.from(new Set([...existing.teamMembers, ...teamMembers]));
        console.log(`  ⚠️ Leader already exists, merging members`);
        continue;
      }

      console.log(`  ✅ PARSED`);

      parsed[teamLeader] = {
        email,
        teamName,
        teamMembers,
      };
    } catch (error) {
      console.warn(`Error parsing row ${row}:`, error);
      continue;
    }
  }

  console.log(`\n✅ PARSING COMPLETE`);
  console.log(`Total teams parsed: ${Object.keys(parsed).length}`);
  console.log("Teams found:", Object.keys(parsed));

  return parsed;
}


/**
 * Search for a student in a specific event
 */
export async function searchStudent(
  name: string,
  event: string,
  email: string
): Promise<StudentData | null> {
  const eventKey = normalizeEventKey(event);

  const eventFileMap: { [key: string]: string } = {
    battlearena: "battle arena.xlsx",
    clonecraft: "clone_craft.xlsx",
    prompathon: "prompathon.xlsx",
    treasuretrial: "treasure_trail.xlsx",
  };

  const fileName = eventFileMap[eventKey] || `${eventKey}.xlsx`;

  try {
    const eventData = await parseExcelFile(fileName);

    const normalizedName = name.toLowerCase().trim();
    const normalizedEmail = email.toLowerCase().trim();

    console.log("\n🔐 ========== SEARCHING FOR STUDENT ==========");
    console.log("Input:");
    console.log(`  Name: "${name}" → normalized: "${normalizedName}"`);
    console.log(`  Email: "${email}" → normalized: "${normalizedEmail}"`);
    console.log(`  Event: "${event}" (file: ${fileName})`);
    
    console.log("\n📍 Available teams:");
    for (const [leader, data] of Object.entries(eventData)) {
      console.log(`  • ${leader} (${data.email})`);
    }

    console.log("\n🔍 Searching by Team Leader Name + Email...");
    // Search for the team leader by name and email
    for (const [teamLeader, data] of Object.entries(eventData)) {
      const leaderLower = teamLeader.toLowerCase().trim();
      const emailLower = data.email.toLowerCase().trim();
      
      const leaderMatch = leaderLower === normalizedName;
      const emailMatch = emailLower === normalizedEmail;

      console.log(`\n  Checking: "${teamLeader}"`);
      console.log(`    Name: "${leaderLower}" === "${normalizedName}" ? ${leaderMatch}`);
      console.log(`    Email: "${emailLower}" === "${normalizedEmail}" ? ${emailMatch}`);

      if (leaderMatch && emailMatch) {
        console.log(`\n  ✅ MATCH FOUND!`);
        console.log(`  Team: ${data.teamName}`);
        console.log(`  Members: ${data.teamMembers.join(", ")}`);
        
        return {
          name: teamLeader,
          email: data.email,
          teamName: data.teamName,
          teamMembers: data.teamMembers,
          event: event,
          teamLeader,
        };
      }
    }

    // If no exact match, try searching by member name and email
    console.log("\n🔍 Searching by Team Member Name + Email...");
    for (const [teamLeader, data] of Object.entries(eventData)) {
      const emailMatch = data.email.toLowerCase().trim() === normalizedEmail;
      if (!emailMatch) continue;

      console.log(`\n  Checking team: "${teamLeader}"`);
      console.log(`    Members: ${data.teamMembers.map(m => `"${m}"`).join(", ")}`);
      
      const memberMatch = data.teamMembers.some(
        (member) => member.toLowerCase().trim() === normalizedName
      );

      if (memberMatch) {
        console.log(`    ✅ FOUND "${normalizedName}" in team members!`);
        return {
          name: teamLeader,
          email: data.email,
          teamName: data.teamName,
          teamMembers: data.teamMembers,
          event: event,
          teamLeader,
        };
      }
    }

    console.log("\n❌ NO MATCH FOUND");
    console.log("Student not found in any team");

    return null;
  } catch (error) {
    console.error("Error parsing Excel file:", error);
    return null;
  }
}

/**
 * Draw text on image canvas with specified positioning
 */
function drawTextOnCanvas(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number = 24,
  maxWidth?: number,
  fontFamily: string = "Arial, sans-serif",
  fontWeight: string = "normal"
): void {
  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Handle text wrapping if maxWidth is provided
  if (maxWidth) {
    const words = text.split(" ");
    let line = "";
    let lineY = y;

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      const metrics = ctx.measureText(testLine);

      if (metrics.width > maxWidth && line !== "") {
        ctx.fillText(line, x, lineY);
        line = words[i] + " ";
        lineY += fontSize + 10;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, lineY);
  } else {
    ctx.fillText(text, x, y);
  }
}

function normalizeEventKey(eventName: string) {
  const normalized = eventName.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

  if (normalized.includes("battle")) {
    return "battlearena";
  }
  if (normalized.includes("clone")) {
    return "clonecraft";
  }
  if (normalized.includes("prompt")) {
    return "prompathon";
  }
  if (normalized.includes("treasure")) {
    return "treasuretrial";
  }

  return normalized.replace(/\s+/g, "");
}

function getCertificateConfig(eventName: string, canvas: HTMLCanvasElement) {
  const eventKey = normalizeEventKey(eventName);

  const defaultConfig = {
    nameY: canvas.height * 0.625,
  };

  if (eventKey === "battlearena") {
    return {
      nameY: canvas.height * 0.625,
    };
  }

  if (eventKey === "clonecraft") {
    return {
      nameY: canvas.height * 0.625,
    };
  }

  if (eventKey === "prompathon") {
    return {
      nameY: canvas.height * 0.625,
    };
  }

  if (eventKey === "treasuretrial") {
    return {
      nameY: canvas.height * 0.625,
    };
  }

  return defaultConfig;
}

function getEventCertificateTemplate(eventName: string) {
  const eventKey = normalizeEventKey(eventName);

  if (eventKey === "battlearena") {
    return "/certificate/battle_arena_certificate.jpeg";
  }

  if (eventKey === "clonecraft") {
    return "/certificate/clonecraft_certificate.jpeg";
  }

  if (eventKey === "prompathon") {
    return "/certificate/prompathon_certificate.jpeg";
  }

  if (eventKey === "treasuretrial") {
    return "/certificate/treasure_trail_certificate.jpeg";
  }

  return "/certificate/certificate.jpeg";
}

/**
 * Generate certificate for a single person
 */
export async function generateCertificateImage(
  personName: string,
  allNames: string[],
  eventName: string
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    const templatePath = getEventCertificateTemplate(eventName);
    let triedFallback = false;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      // Draw the background image
      ctx.drawImage(img, 0, 0);

      const centerX = canvas.width / 2;
      const config = getCertificateConfig(eventName, canvas);

      // Draw only the participant name in bold cursive
      drawTextOnCanvas(
        ctx,
        personName,
        centerX,
        config.nameY,
        68,
        canvas.width - 160,
        "Segoe Script, Monotype Corsiva, Brush Script MT, Lucida Calligraphy, cursive",
        "normal"
      );

      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Could not convert canvas to blob"));
        }
      }, "image/jpeg", 0.95);
    };

    img.onerror = () => {
      if (!triedFallback && templatePath !== "/certificate/certificate.jpeg") {
        triedFallback = true;
        img.src = "/certificate/certificate.jpeg";
        return;
      }
      reject(new Error("Could not load certificate image"));
    };

    img.src = templatePath;
  });
}

/**
 * Create a ZIP file with all team member certificates
 */
export async function createCertificateZip(
  teamLeaderName: string,
  teamMembers: string[],
  eventName: string
): Promise<Blob> {
  const zip = new JSZip();
  const certificatesFolder = zip.folder("certificates");

  if (!certificatesFolder) {
    throw new Error("Could not create certificates folder in ZIP");
  }

  // All names including team leader
  const allNames = [teamLeaderName, ...teamMembers];

  // Generate certificate for each person
  for (const personName of allNames) {
    const certificateBlob = await generateCertificateImage(personName, allNames, eventName);
    const fileName = `${personName.replace(/\s+/g, "_")}_Certificate.jpg`;
    certificatesFolder.file(fileName, certificateBlob);
  }

  return zip.generateAsync({ type: "blob" });
}

/**
 * Trigger download of a blob file
 */
export function downloadBlob(blob: Blob, fileName: string): void {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
