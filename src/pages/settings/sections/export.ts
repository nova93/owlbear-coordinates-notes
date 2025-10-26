export default (id: string) => `
  <h2 class="text-2xl mt-3 mb-1">Export<h2>
  <p class="my-2">Press the button to export your notes. The file will be downloaded to your default download location. It will be a JSON file, which is a common format for holding data. You should be able to open with any app which opens text files, if you want to inspect it.</p>
  <button class="btn btn-outline btn-block" id="${id}">Export data</button>
`;
