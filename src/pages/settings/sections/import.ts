import alert from "../../../components/alert";

export default (formId: string, fileInputId: string) => `
  <h2 class="text-2xl mt-3 mb-1">Import</h2>
  <p class="my-2">If you have previously exported your notes, you can use the import form to override your current notes. This is very useful if you want to use multiple devices or go back in time.</p>
  ${alert("Note: Importing notes will delete your current notes and replace them with the imported ones.")}
  <form id="${formId}">
    <fieldset class="fieldset my-4">
      <input class="file-input w-full" type="file" id="${fileInputId}" name="file" accept=".json" required />
      <button class="btn btn-outline btn-block" type="submit">Import</button>
    </fieldset>
  </form>
`;
