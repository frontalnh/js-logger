describe("test logger", () => {
  it("Write log to file", () => {
    const { LoggerFactory } = require("./index");
    const loggerFactory = new LoggerFactory({
      path: "./build",
      writeFile: true
    });
    const logger = loggerFactory.createLogger("<moduleName>");

    logger.info("hello", { name: "hello" }, { age: "10" });
  });

  it("error", () => {
    const { LoggerFactory } = require("./index");
    const loggerFactory = new LoggerFactory({ path: "." });
    const logger = loggerFactory.createLogger("<moduleName>");
    try {
      throw new Error("hello");
    } catch (err) {
      logger.error("error occured", err);
      logger.error(err);
      return;
    }
  });
});
