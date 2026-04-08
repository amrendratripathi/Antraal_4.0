# Quick Testing Guide - Certificate Feature

## ✅ Pre-Testing Requirements

Before testing, ensure you have:
- [ ] `battle arena.xlsx` in `public/certificate/`
- [ ] `clone_craft.xlsx` in `public/certificate/`
- [ ] `prompathon.xlsx` in `public/certificate/`
- [ ] `treasure_trial.xlsx` in `public/certificate/`
- [ ] `certificate.jpeg` in `public/certificate/`

## 🧪 Testing Steps

### Step 1: Start Development Server
```bash
npm run dev
```
Wait for the server to start (usually http://localhost:5173)

### Step 2: Navigate to Certificate Page
- Click "Certificates" button in navbar
- OR Go directly to http://localhost:5173/certificates

### Step 3: Test Search Functionality

**Test Case 1: Valid Student**
1. Enter a valid team leader name from your Excel files (e.g., "Sarthak Chaurasia")
2. Enter the corresponding email (e.g., "sarthakchaurasiabtech24-28@liet.in")
3. Select "Battle Arena" from event dropdown
4. Click "Search"
5. Expected: Student found message, team details shown

**Test Case 2: Invalid Student**
1. Enter "Invalid Name"
2. Enter "test@example.com"
3. Select any event
4. Click "Search"
5. Expected: Error message "Student not found..."

**Test Case 3: Wrong Email**
1. Enter valid team leader name
2. Enter wrong email address
3. Select correct event
4. Click "Search"
5. Expected: Error message

### Step 4: Test Certificate Download

**After successful search:**
1. Verify team information is displayed correctly
2. Click "Download Certificates"
3. Wait 3-5 seconds for generation
4. Check if ZIP file downloads
5. Extract ZIP and verify:
   - Contains certificates for all team members
   - Files named: `{MemberName}_Certificate.jpg`
   - Each certificate displays team member name

### Step 5: Test Different Events

Repeat the search with different events:
- Battle Arena
- Clone Craft
- Prompathon
- Treasure Trial

### Step 6: Test Mobile Responsiveness

1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test on different screen sizes:
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1024px+)
4. Verify:
   - Form is readable and usable
   - Buttons are clickable
   - Layout doesn't break

## 📝 Test Data

Use actual data from your Excel files:

**Example from Battle Arena:**
- Team Leader: Sarthak Chaurasia
- Email: sarthakchaurasiabtech24-28@liet.in
- Team Members: Aman Kumar, Shubham Swami, Vatsal Upadhyay

## 🐛 Debugging Tips

### If Search Doesn't Work:
1. Open browser DevTools (F12)
2. Go to "Console" tab
3. Check for error messages
4. Look for messages like: "Error parsing Excel file"
5. Verify Excel file structure matches expected columns

### If Certificate Download Fails:
1. Check Console for errors
2. Verify `certificate.jpeg` exists in `public/certificate/`
3. Ensure Canvas API is supported
4. Try different browser (Chrome/Firefox)

### Enable Debug Logging:
Edit `certificateUtils.ts` and add console logs:
```typescript
console.log("Parsed data:", parsed);
console.log("Student found:", student);
console.log("Certificate blob created:", certificateBlob);
```

## ✨ Expected Behavior

### Form Submission
- [ ] Form fields are required (validation works)
- [ ] Event dropdown shows all 4 events
- [ ] Loading spinner appears during search
- [ ] Button is disabled while loading

### Search Results
- [ ] Correct team information displays
- [ ] Team members listed properly
- [ ] Event name shown correctly
- [ ] "Download Certificates" button appears

### Certificate Generation
- [ ] ZIP file downloads automatically
- [ ] Filename includes event name and team size
- [ ] Download takes 3-5 seconds
- [ ] No errors in console

### User Flow
- [ ] Can search again after download
- [ ] Reset button clears form
- [ ] Back button/navigation works

## 📊 Certificate Content Validation

After extracting downloaded ZIP:
1. Open each certificate image
2. Verify:
   - [ ] Event name is visible and readable
   - [ ] Person's name is prominently displayed
   - [ ] All team member names are listed
   - [ ] Current date is shown
   - [ ] Text is not cut off
   - [ ] Colors and formatting look good

## ⚠️ Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Cannot find certificate file" | Verify `certificate.jpeg` exists in `public/certificate/` |
| Student not found | Check exact spelling and email in Excel |
| ZIP won't download | Try different browser, check console |
| Text positioning wrong | Adjust coordinates in `generateCertificateImage()` |
| URLs in team members | Excel parsing filters URLs, truncate if needed |

## 🎯 Performance Benchmarks

Expected timings (should complete within):
- Search execution: < 1 second
- Certificate generation (per person): 0.3-0.5 seconds
- ZIP creation: 1-2 seconds
- **Total for 4-person team:** 2-5 seconds

## ✅ Sign-Off Checklist

- [ ] Certificate button appears in navbar (desktop)
- [ ] Certificate button appears in navbar (mobile)
- [ ] Navigation to `/certificates` works
- [ ] Search finds valid students
- [ ] Search rejects invalid entries
- [ ] Certificate download works
- [ ] ZIP contains correct files
- [ ] Certificate text displays properly
- [ ] All 4 events can be searched
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Build completes without errors

## 📞 Support Commands

```bash
# Development
npm run dev

# Build
npm run build

# Preview built version
npm run preview

# Type check
npx tsc --noEmit

# Lint
npm run lint
```

---

**Note:** Make sure to test with real data from your Excel files for the most accurate results.
