export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action");

    let endpoint = undefined;
    const params = {};
    if (action === "get_byEmail") {
      const email = searchParams.get("email");
      endpoint = `/users/email/${email}`;
    }
    if (action === "get_byId") {
      const id = searchParams.get("id");
      endpoint = `/users/id/${id}`;
    }
    if (action === `get_byGoogleId`) {
      const googleId = searchParams.get("googleId");
      endpoint = `/${googleId}`;
    }

    const response = await fetch("https://encrypted-chat-app-zrlv.onrender.com/api" + endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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
export async function POST(req) {
  try {
    const body = await req.json();

    let endpoint = undefined;
    if (body.action === "create_user") {
      endpoint = "/api/register";
    }
    if (body.action === "validate_user") {
      endpoint = "/api/login";
    }

    console.log("body: ", body);
    const response = await fetch("https://encrypted-chat-app-zrlv.onrender.com" + endpoint, {
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
export async function PUT() {
  try {
    const body = await req.json();

    let endpoint = undefined;
    if (body.action === "update_password") {
      endpoint = "/update-password";
    }
    if (body.action === "update_displayName") {
      endpoint = "/update-username";
    }

    console.log("body: ", body);
    const response = await fetch("https://encrypted-chat-app-zrlv.onrender.com" + endpoint, {
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
export async function DELETE() {
  try {
    const body = await req.json();

    let endpoint = undefined;
    if (body.action === "delete_user") {
      endpoint = "/delete/:email";
    }

    console.log("body: ", body);
    const response = await fetch("https://encrypted-chat-app-zrlv.onrender.com" + endpoint, {
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
    POST/usersCreate a new user account
    POST/users/validateValidate user credentials
    GET/users/email/:emailGet user by email
    GET/users/:idGet user by ID
    GET/users/google/:googleIdGet user by Google ID
    PUT/users/passwordUpdate user password
    PUT/users/display-nameUpdate user display name
    DELETE/users/:emailDelete user account
    */
}
