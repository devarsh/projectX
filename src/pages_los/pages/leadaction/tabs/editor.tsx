import { Editor } from "@tinymce/tinymce-react";

export const TextEditor = () => {
  const handleEditorChange = (content, editor) => {};

  return (
    <Editor
      initialValue="<p>This is the initial content of the editor</p>"
      apiKey="pc8b933js2e6hly9nkp1ha2nuyak0anqgq47c31y2kontd64"
      init={{
        height: 300,
        menubar: false,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
        ],
        toolbar:
          "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | insertdatetime | table | help",
      }}
      onEditorChange={handleEditorChange}
    />
  );
};
