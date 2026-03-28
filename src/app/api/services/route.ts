import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json({ services: [] }, { status: 500 });
  }

  return NextResponse.json({ services: data || [] });
}

export async function POST(request: Request) {
  try {
    const { services } = await request.json();
    if (!Array.isArray(services)) {
      return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
    }

    const { error: deleteError } = await supabase.from("services").delete().neq("id", 0);
    if (deleteError) {
      console.error("Error clearing services:", deleteError);
    }

    if (services.length > 0) {
      const { error: insertError } = await supabase.from("services").insert(services);
      if (insertError) {
        console.error("Error inserting services:", insertError);
        return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }
}
