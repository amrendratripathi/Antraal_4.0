import * as XLSX from "xlsx";
import JSZip from "jszip";

export interface StudentData {
  name: string;
  email: string;
  teamMembers: string[];
  event: string;
  teamLeader: string;
}

export interface ParsedEventData {
  [teamLeader: string]: {
    email: string;
    teamMembers: string[];
    event: string;
  };
}

/**
 * Fetch and parse Excel file from public folder
 * Excel structure:
 * Col B (1): Email
 * Col C (2): Student name
 * Col H (7): Event name
 * Col J (9): Team leader name
 * Cols K-N (10-13): Team members
 */
export async function parseExcelFile(fileName: string): Promise<ParsedEventData> {
  const response = await fetch(`/certificate/${encodeURIComponent(fileName)}`);
  const arrayBuffer = await response.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: "array" });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  
  const parsed: ParsedEventData = {};
  const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1");

  // Iterate through rows (skip header if needed)
  for (let row = 0; row <= range.e.r; row++) {
    try {
      // Read cell values directly by position
      const emailCell = worksheet[XLSX.utils.encode_cell({ r: row, c: 1 })]; // Col B
      const eventCell = worksheet[XLSX.utils.encode_cell({ r: row, c: 7 })]; // Col H
      const teamLeaderCell = worksheet[XLSX.utils.encode_cell({ r: row, c: 9 })]; // Col J

      const email = emailCell?.v?.toString().trim();
      const event = eventCell?.v?.toString().trim();
      const teamLeader = teamLeaderCell?.v?.toString().trim();

      if (!email || !email.includes("@") || !teamLeader || !event) continue;

      // Read team members from columns K, L, M, N (indices 10, 11, 12, 13)
      const teamMembers: string[] = [];
      for (let col = 10; col <= 13; col++) {
        const memberCell = worksheet[XLSX.utils.encode_cell({ r: row, c: col })];
        const memberName = memberCell?.v?.toString().trim();
        // Filter out URLs and empty strings
        if (memberName && !memberName.startsWith("http")) {
          teamMembers.push(memberName);
        }
      }

      // Use team leader name as key, and store email and members
      parsed[teamLeader] = {
        email,
        teamMembers,
        event,
      };
    } catch (error) {
      console.warn(`Error parsing row ${row}:`, error);
      continue;
    }
  }

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
    treasuretrial: "treasure_trial.xlsx",
  };

  const fileName = eventFileMap[eventKey] || `${eventKey}.xlsx`;

  try {
    const eventData = await parseExcelFile(fileName);

    const normalizedName = name.toLowerCase().trim();
    const normalizedEmail = email.toLowerCase().trim();

    // Search for the team leader by name and email
    for (const [teamLeader, data] of Object.entries(eventData)) {
      if (
        teamLeader.toLowerCase().trim() === normalizedName &&
        data.email.toLowerCase().trim() === normalizedEmail
      ) {
        return {
          name: teamLeader,
          email: data.email,
          teamMembers: data.teamMembers,
          event: data.event,
          teamLeader,
        };
      }
    }

    // If no team leader match, search by member name and email
    for (const [teamLeader, data] of Object.entries(eventData)) {
      if (data.email.toLowerCase().trim() !== normalizedEmail) continue;
      const memberMatch = data.teamMembers.some(
        (member) => member.toLowerCase().trim() === normalizedName
      );
      if (memberMatch) {
        return {
          name: teamLeader,
          email: data.email,
          teamMembers: data.teamMembers,
          event: data.event,
          teamLeader,
        };
      }
    }

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
    nameY: canvas.height * 0.64,
  };

  if (eventKey === "battlearena") {
    return {
      nameY: canvas.height * 0.64,
    };
  }

  if (eventKey === "clonecraft") {
    return {
      nameY: canvas.height * 0.64,
    };
  }

  if (eventKey === "prompathon") {
    return {
      nameY: canvas.height * 0.64,
    };
  }

  if (eventKey === "treasuretrial") {
    return {
      nameY: canvas.height * 0.64,
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
        56,
        canvas.width - 160,
        "Snell Roundhand, Brush Script MT, Lucida Calligraphy, cursive",
        "bold"
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
