import { render, screen } from "@testing-library/react";
import DetailNavigation from "@/components/Events/DetailNavigation";

describe("DetailNavigation", () => {
  it("If isCreator prop is false, won't see the Edit Button", () => {
    render(
      <DetailNavigation
        setView={() => {}}
        isCreator={false}
        setSelectedEvent={() => {}}
      />
    );
    const buttonElements = screen.getAllByRole("button");
    let hasEdit = false;
    for (let button of buttonElements) {
      if (button.textContent === "Edit") {
        hasEdit = true;
        break;
      }
    }
    expect(hasEdit).toBe(false);
  });

  it("If isCreator prop is true, will see the Edit Button", () => {
    render(
      <DetailNavigation
        setView={() => {}}
        isCreator={true}
        setSelectedEvent={() => {}}
      />
    );
    const buttonElement = screen.getByTestId("edit-button");
    expect(buttonElement).toBeDefined();
  });
});
