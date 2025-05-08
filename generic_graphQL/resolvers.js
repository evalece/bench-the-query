module.exports = {
    Query: {
      redis: async (_, { command, args }, { redis }) => {
        try {
          const method = command.toLowerCase();
          if (typeof redis[method] !== "function") {
            throw new Error(`Unsupported command: ${command}`);
          }
  
          const result = await redis[method](...args);
          return typeof result === 'object' ? JSON.stringify(result, null, 2) : result?.toString?.(); //note: remove json stringify later or to match equavalent handle in FastAPI
        } catch (err) {
          return `Error: ${err.message}`;
        }
      }
    }
  };
  