import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import { useEffect, useRef } from 'react';
import {
  FiBold, FiItalic, FiUnderline, FiLink, FiAlignLeft,
  FiAlignCenter, FiAlignRight, FiList, FiMinus, FiType, 
} from 'react-icons/fi';
import { RiDoubleQuotesL } from 'react-icons/ri';
import './RichTextEditor.css';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  const handleButtonClick = (action: () => void, e: React.MouseEvent) => {
    e.preventDefault(); // Buton tıklamalarının form submit etmesini engelle
    action();
  };

  const setLink = (e: React.MouseEvent) => {
    e.preventDefault();
    const selection = editor.state.selection;
    if (selection.empty) {
      alert('Lütfen önce bir metin seçin');
      return;
    }

    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Link URL\'si girin:', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().unsetLink().run();
      return;
    }

    try {
      new URL(url);
      editor.chain().focus().setLink({ href: url }).run();
    } catch {
      alert('Geçerli bir URL giriniz');
    }
  };

  return (
    <div className="menu-bar">
      <div className="flex flex-wrap gap-1 px-2 py-1.5">
        {/* Metin Stili */}
        <button
          onClick={(e) => handleButtonClick(() => editor.chain().focus().toggleBold().run(), e)}
          className={`editor-btn ${editor.isActive('bold') ? 'is-active' : ''}`}
          title="Kalın"
          type="button"
        >
          <FiBold />
        </button>
        <button
          onClick={(e) => handleButtonClick(() => editor.chain().focus().toggleItalic().run(), e)}
          className={`editor-btn ${editor.isActive('italic') ? 'is-active' : ''}`}
          title="İtalik"
          type="button"
        >
          <FiItalic />
        </button>
        <button
          onClick={(e) => handleButtonClick(() => editor.chain().focus().toggleUnderline().run(), e)}
          className={`editor-btn ${editor.isActive('underline') ? 'is-active' : ''}`}
          title="Altı Çizili"
          type="button"
        >
          <FiUnderline />
        </button>
        <button
          onClick={(e) => handleButtonClick(() => editor.chain().focus().toggleHighlight().run(), e)}
          className={`editor-btn ${editor.isActive('highlight') ? 'is-active' : ''}`}
          title="Vurgula"
          type="button"
        >
          <FiType />
        </button>

        <div className="border-l border-gray-200 mx-1" />

        {/* Hizalama */}
        <button
          onClick={(e) => handleButtonClick(() => editor.chain().focus().setTextAlign('left').run(), e)}
          className={`editor-btn ${editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}`}
          title="Sola Hizala"
          type="button"
        >
          <FiAlignLeft />
        </button>
        <button
          onClick={(e) => handleButtonClick(() => editor.chain().focus().setTextAlign('center').run(), e)}
          className={`editor-btn ${editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}`}
          title="Ortala"
          type="button"
        >
          <FiAlignCenter />
        </button>
        <button
          onClick={(e) => handleButtonClick(() => editor.chain().focus().setTextAlign('right').run(), e)}
          className={`editor-btn ${editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}`}
          title="Sağa Hizala"
          type="button"
        >
          <FiAlignRight />
        </button>

        <div className="border-l border-gray-200 mx-1" />

        {/* Listeler */}
        <button
          onClick={(e) => handleButtonClick(() => editor.chain().focus().toggleBulletList().run(), e)}
          className={`editor-btn ${editor.isActive('bulletList') ? 'is-active' : ''}`}
          title="Liste"
          type="button"
        >
          <FiList />
        </button>

        <div className="border-l border-gray-200 mx-1" />

        {/* Özel Bloklar */}
        <button
          onClick={(e) => handleButtonClick(() => editor.chain().focus().toggleBlockquote().run(), e)}
          className={`editor-btn ${editor.isActive('blockquote') ? 'is-active' : ''}`}
          title="Alıntı"
          type="button"
        >
          <RiDoubleQuotesL size={20} />
        </button>
        <button
          onClick={(e) => handleButtonClick(() => editor.chain().focus().setHorizontalRule().run(), e)}
          className="editor-btn"
          title="Ayraç"
          type="button"
        >
          <FiMinus />
        </button>

        <div className="border-l border-gray-200 mx-1" />

        {/* Bağlantılar */}
        <button
          onClick={setLink}
          className={`editor-btn ${editor.isActive('link') ? 'is-active' : ''}`}
          title="Link Ekle"
          type="button"
        >
          <FiLink />
        </button>
      </div>
    </div>
  );
};

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        horizontalRule: {
          HTMLAttributes: {
            class: 'my-4 border-t-2 border-gray-200',
          },
        },
        blockquote: {
          HTMLAttributes: {
            class: 'blockquote-custom',
          },
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 hover:text-blue-600 underline',
        },
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight,
    ],
    content: '',
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML();
      
      // Eğer kullanıcı yazıyorsa, timeout'u temizle ve yeni bir timeout başlat
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Kullanıcı yazmayı bitirdikten 500ms sonra içeriği güncelle
      timeoutRef.current = setTimeout(() => {
        onChange(newContent);
      }, 500);
    },
    editorProps: {
      attributes: {
        class: 'h-full outline-none',
      },
    },
  });

  // Component unmount olduğunda timeout'u temizle
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  return (
    <div className="rich-text-editor h-full flex flex-col">
      <MenuBar editor={editor} />
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <EditorContent editor={editor} className="h-full" />
      </div>
    </div>
  );
}