// JSON Server module
import { create, router as _router, defaults, rewriter } from "json-server";
const server = create();
const router = _router("db/db.json");

// Make sure to use the default middleware
const middlewares = defaults();

server.use(middlewares);
// Add this before server.use(router)
server.use(
  // Add custom route here if needed
  rewriter({
    "/api/*": "/$1",
  })
);
server.use(router);
// Listen to port
server.listen(3001, () => {
  console.log("JSON Server is running");
});

// Export the Server API
export default server;
