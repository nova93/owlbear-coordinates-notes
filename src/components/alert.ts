import triangleWarning from "../assets/triangle-warning.svg" with {
	type: "text",
};

export default (message: string) => `
  <div role="alert" class="alert alert-warning alert-soft">
    ${triangleWarning}
    <span>${message}</span>
  </div>
`;
