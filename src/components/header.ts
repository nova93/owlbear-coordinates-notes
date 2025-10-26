import avatar from "./avatar";
import obrButton from "./obrButton";
import supportButton from "./supportButton";

export default (title: string) => `
  <header>
    <div class="flex items-center gap-4">
      ${avatar}
      <h1 class="text-2xl">${title}</h1>
    </div>
    <nav class="mt-4">
      ${supportButton}
      ${obrButton}
    </nav>
  </header>
`;
