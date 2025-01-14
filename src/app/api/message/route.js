//get new messages
export async function GET(req) {
  try {
    const body = await req.json();
    console.log("body: ", body);
    const response = await fetch("https://encrypted-chat-app-zrlv.onrender.com/api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();

    return new Response(JSON.stringify(result), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error requesting Server: ", error);
    return new Response("Error requesting Server", { status: 500 });
  }
}
//create new message
export async function POST(req) {
  try {
    const body = await req.json();
    console.log("body: ", body);
    const response = await fetch("https://encrypted-chat-app-zrlv.onrender.com/api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();

    return new Response(JSON.stringify(result), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error requesting Server: ", error);
    return new Response("Error requesting Server", { status: 500 });
  }
}
// update existing message
export async function PUT(req) {
  try {
    const body = await req.json();
    console.log("body: ", body);
    const response = await fetch("https://encrypted-chat-app-zrlv.onrender.com/api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();

    return new Response(JSON.stringify(result), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error requesting Server: ", error);
    return new Response("Error requesting Server", { status: 500 });
  }
}
//delete existing message
export async function DELETE(req) {
  try {
    const body = await req.json();
    console.log("body: ", body);
    const response = await fetch("https://encrypted-chat-app-zrlv.onrender.com/api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();

    return new Response(JSON.stringify(result), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error requesting Server: ", error);
    return new Response("Error requesting Server", { status: 500 });
  }
}
{
  /*
    POST/messagesCreate a new message
    GET/messagesRetrieve messages with pagination
    PUT/messagesUpdate an existing message
    DELETE/messagesDelete a specific message 
    */
}
