import * as http from "http";
import * as fs from "fs";
import * as path from "path";
import * as url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  let slidesData = JSON.parse(fs.readFileSync("./slides.json"));

  if (parsedUrl.pathname === "/api/slides") {
    res.writeHead(200, { ...corsHeaders, "Content-Type": "application/json" });
    res.end(JSON.stringify(slidesData));
  } else if (
    parsedUrl.pathname.startsWith("/images/") ||
    parsedUrl.pathname.startsWith("/audio/")
  ) {
    const filePath = path.join(__dirname, parsedUrl.pathname);

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { ...corsHeaders, "Content-Type": "text/plain" });
        res.end("Not Found");
      } else {
        const contentType = parsedUrl.pathname.startsWith("/images/")
          ? "image/jpeg"
          : "audio/mp3";
        res.writeHead(200, { ...corsHeaders, "Content-Type": contentType });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, { ...corsHeaders, "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

const port = 3001;
server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
