import openPopover from '../../lib/openPopover';
import '../../style.css';
 
const url = new URL(window.location.toString());
const sceneId = url.searchParams.get('sceneId');
const x = Number(url.searchParams.get('x'));
const y = Number(url.searchParams.get('y'));

const renderNote = async () => {
  const res = await fetch(`/api?${url.searchParams.toString()}`);
  const {formatted, raw} = await res.json()
  
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <header>
      <button id="editButton">Edit</button>
      <button id="saveButton" class="hidden">Save</button>
      <button id="cancelButton" class="hidden">Cancel</button>
      <button id="sizeUp">Resize</button>
      <button id="sizeDown" class="hidden">Resize</button>
    </header>
    <main>
      <div id="formatted">
        ${formatted}
      </div>
      <textarea id="raw" class="hidden">${raw}</textarea>
    </main>
  `

  const editButton: HTMLButtonElement = document.querySelector('#editButton');
  const saveButton: HTMLButtonElement = document.querySelector('#saveButton');
  const cancelButton: HTMLButtonElement = document.querySelector('#cancelButton');
  const formattedElem: HTMLDivElement = document.querySelector('#formatted');
  const textarea: HTMLTextAreaElement = document.querySelector('#raw');
  const sizeUp: HTMLButtonElement = document.querySelector('#sizeUp');
  const sizeDown: HTMLButtonElement = document.querySelector('#sizeDown');

  const toggleButtons = () => {
    editButton.classList.toggle('hidden');
    saveButton.classList.toggle('hidden');
    cancelButton.classList.toggle('hidden');
    textarea.classList.toggle('hidden');
    formattedElem.classList.toggle('hidden');
  }

  const toggleSizers = () => {
     sizeUp.classList.toggle('hidden');
     sizeDown.classList.toggle('hidden')
  }

  const handleEditClick = () => {
    toggleButtons()
  }
  const handleSubmitClick = async () => {
    const res = await fetch('/api', {
      method: 'POST',
      body: JSON.stringify({
        x,
        y,
        sceneId,
        content: textarea.value
      })})

      if (res.ok) {
        await renderNote()
        return
      }

      throw Error('failed to submit')
  }
  const handleCancelClick = async () => {
    await renderNote()
  }
  const sizeUpClick = async () => {
    toggleSizers();
    await openPopover({x, y, sceneId}, 'large')
  }
  const sizeDownClick = async () => {
    toggleSizers();
    await openPopover({x, y, sceneId}, 'small')
  }

  editButton.addEventListener('click', handleEditClick);
  saveButton.addEventListener('click', handleSubmitClick);
  cancelButton.addEventListener('click', handleCancelClick);
  sizeUp.addEventListener('click', sizeUpClick);
  sizeDown.addEventListener('click', sizeDownClick);
}

await renderNote()
