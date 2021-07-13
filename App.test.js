import App from "./App";

describe("listUsers", () => {
  it("returns a ul", () => {
    const instance = new App();
    const actual = instance.listUsers([]);

    expect(actual).toHaveProperty("type", "ul");
  });

  it("returns a child element for each user", () => {
    const instance = new App();
    const actual = instance.listUsers([{ name: "User A" }, { name: "User B" }]);

    expect(actual.props.children).toHaveLength(2);
  });

  it("calls handleDropdown onChange wthout target", () => {
    const instance = new App();
    const eventObject = (value) => ({
      currentTarget: { value },
    });

    const loadedObj = instance.handleChange(eventObject("biz"));
    expect(loadedObj);
  });
});
