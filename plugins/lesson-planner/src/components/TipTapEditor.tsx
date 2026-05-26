import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, List, ListOrdered, Heading1, Heading2, Strikethrough } from 'lucide-react';

interface TipTapEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export const TipTapEditor = ({ content, onChange, placeholder }: TipTapEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base dark:prose-invert focus:outline-none min-h-[150px] p-4 bg-slate-900/50 rounded-b-xl border-x border-b border-slate-800 text-slate-200',
      },
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col rounded-xl overflow-hidden shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-800/80 border border-slate-700 rounded-t-xl border-b-0 backdrop-blur-sm">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded-lg transition-colors ${editor.isActive('bold') ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400 hover:bg-slate-700 hover:text-slate-200'}`}
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded-lg transition-colors ${editor.isActive('italic') ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400 hover:bg-slate-700 hover:text-slate-200'}`}
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-1.5 rounded-lg transition-colors ${editor.isActive('strike') ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400 hover:bg-slate-700 hover:text-slate-200'}`}
        >
          <Strikethrough className="w-4 h-4" />
        </button>
        <div className="w-px h-4 bg-slate-700 mx-1"></div>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-1.5 rounded-lg transition-colors ${editor.isActive('heading', { level: 1 }) ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400 hover:bg-slate-700 hover:text-slate-200'}`}
        >
          <Heading1 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-1.5 rounded-lg transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400 hover:bg-slate-700 hover:text-slate-200'}`}
        >
          <Heading2 className="w-4 h-4" />
        </button>
        <div className="w-px h-4 bg-slate-700 mx-1"></div>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded-lg transition-colors ${editor.isActive('bulletList') ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400 hover:bg-slate-700 hover:text-slate-200'}`}
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 rounded-lg transition-colors ${editor.isActive('orderedList') ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400 hover:bg-slate-700 hover:text-slate-200'}`}
        >
          <ListOrdered className="w-4 h-4" />
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  );
};
