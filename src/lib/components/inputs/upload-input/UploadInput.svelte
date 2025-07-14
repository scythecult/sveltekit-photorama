<script lang="ts">
  import './styles.css';

  // TODO Refactor
  type UploadInputProps = {
    className?: string;
    name: string;
    accept: string;
    placeholder: string;
    isLabelSeparate?: boolean;
    onChange?: (file: File) => void;
  };

  const { className, onChange, name, accept, placeholder, isLabelSeparate = false }: UploadInputProps = $props();
  const classNameFInal = [className, 'upload-input', !isLabelSeparate && 'primary-button'];

  const handleFileChange = (evt: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
    const { files } = evt.currentTarget;

    if (files?.length) {
      const [file] = files;

      onChange?.(file);
    }
  };
</script>

<div class={classNameFInal}>
  {#if !isLabelSeparate}
    <label class="upload-input__label" for={name}>{placeholder} </label>
  {/if}
  <input
    class="upload-input__field visually-hidden"
    onchange={handleFileChange}
    type="file"
    {name}
    {accept}
    id={name}
  />
</div>
