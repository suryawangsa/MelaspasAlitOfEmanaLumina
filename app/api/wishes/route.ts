import { NextRequest, NextResponse } from "next/server";

const FORM_ACTION_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfTqx4nUqFzkG6iLYGPMMRNPO4wcJqufZHahOGTPAy-xYpgEg/formResponse";

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5I3fqLXfWXSvCWpe5KKGX7Ay_z10296b4XIAJmB_xOVM3pAGY26bBKS6W7KCDFPPFqdgRlpw1kF8B/pub?gid=2104421788&single=true&output=csv";

const ENTRY_IDS = {
  name: "entry.524991345",
  attendance: "entry.850791224",
  message: "entry.1151169564",
};

// Parser CSV sederhana yang tetap aman kalau ada koma di dalam teks ucapan
function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let insideQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (insideQuotes) {
      if (char === '"' && next === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        insideQuotes = false;
      } else {
        field += char;
      }
    } else {
      if (char === '"') {
        insideQuotes = true;
      } else if (char === ",") {
        row.push(field);
        field = "";
      } else if (char === "\n" || char === "\r") {
        if (field !== "" || row.length > 0) {
          row.push(field);
          rows.push(row);
          row = [];
          field = "";
        }
      } else {
        field += char;
      }
    }
  }
  if (field !== "" || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

export async function GET() {
  try {
    const res = await fetch(CSV_URL, { cache: "no-store" });
    const text = await res.text();
    const rows = parseCSV(text);

    // Baris pertama header: Timestamp, Nama, Attendance, Message
    const dataRows = rows.slice(1);

    const wishes = dataRows
      .filter((r) => r.length >= 4 && r[1])
      .map((r) => ({
        createdAt: r[0],
        name: r[1],
        attendance: r[2],
        message: r[3],
      }))
      .reverse(); // ucapan terbaru di atas

    return NextResponse.json({ wishes });
  } catch (err) {
    console.error("Get wishes error:", err);
    return NextResponse.json({ wishes: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, attendance, message } = await req.json();

    if (!name || !attendance || !message) {
      return NextResponse.json(
        { error: "Data tidak lengkap" },
        { status: 400 },
      );
    }

    const formData = new URLSearchParams();
    formData.append(ENTRY_IDS.name, name);
    formData.append(ENTRY_IDS.attendance, attendance);
    formData.append(ENTRY_IDS.message, message);

    await fetch(FORM_ACTION_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Post wish error:", err);
    return NextResponse.json(
      { error: "Gagal menyimpan ucapan" },
      { status: 500 },
    );
  }
}
