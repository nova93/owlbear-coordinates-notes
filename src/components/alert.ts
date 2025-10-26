import triangleWarning from "../assets/triangleWarning";

export default (message: string) => `
  <div role="alert" class="alert alert-warning alert-soft">
    ${triangleWarning}
    <span>${message}</span>
  </div>
`;
