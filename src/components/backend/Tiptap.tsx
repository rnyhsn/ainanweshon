'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Placeholder from '@tiptap/extension-placeholder';
import Superscript from '@tiptap/extension-superscript'
import HorizontalRule from '@tiptap/extension-horizontal-rule'

import { FaListUl } from "react-icons/fa";
import { FaListOl } from "react-icons/fa";
import { GrUndo } from "react-icons/gr";
import { GrRedo } from "react-icons/gr";
import { FaAlignLeft } from "react-icons/fa";
import { FaAlignCenter } from "react-icons/fa";
import { FaAlignRight } from "react-icons/fa";
import { FaAlignJustify } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import { FaSuperscript } from "react-icons/fa";




import { useCallback } from 'react';


const extensions = [
    StarterKit,
    Underline,
    Superscript,
    HorizontalRule,
    Color.configure({
      types: ['textStyle']
    }),
    TextStyle,
    TextAlign.configure({
        types: ['heading', 'paragraph']
    }),
    Placeholder.configure({
      placeholder: "Write your Content..."
    }),
    Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
        isAllowedUri: (url, ctx) => {
            try {
              // construct URL
              const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`)
  
              // use default validation
              if (!ctx.defaultValidate(parsedUrl.href)) {
                return false
              }
  
              // disallowed protocols
              const disallowedProtocols = ['ftp', 'file', 'mailto']
              const protocol = parsedUrl.protocol.replace(':', '')
  
              if (disallowedProtocols.includes(protocol)) {
                return false
              }
  
              // only allow protocols specified in ctx.protocols
              const allowedProtocols = ctx.protocols.map(p => (typeof p === 'string' ? p : p.scheme))
  
              if (!allowedProtocols.includes(protocol)) {
                return false
              }
  
              // disallowed domains
              const disallowedDomains = ['example-phishing.com', 'malicious-site.net']
              const domain = parsedUrl.hostname
  
              if (disallowedDomains.includes(domain)) {
                return false
              }
  
              // all checks have passed
              return true
            } catch {
              return false
            }
          },
          shouldAutoLink: url => {
            try {
              // construct URL
              const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`)
  
              // only auto-link if the domain is not in the disallowed list
              const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com']
              const domain = parsedUrl.hostname
  
              return !disallowedDomains.includes(domain)
            } catch {
              return false
            }
          },
  
    })
]
const Tiptap = ({content}: {content?: string}) => {
  console.log("Content: ", content);

  const editor = useEditor({
    extensions,
    content: `${content ? content : ""}`,
    immediatelyRender: false,
})



const setLink = useCallback(() => {
  const previousUrl = editor?.getAttributes('link').href
  const url = window.prompt('URL', previousUrl)

  // cancelled
  if (url === null) {
    return
  }

  // empty
  if (url === '') {
    editor?.chain().focus().extendMarkRange('link').unsetLink()
      .run()

    return
  }

  // update link
  try {
    editor?.chain().focus().extendMarkRange('link').setLink({ href: url })
      .run()
  } catch (e: any) {
    alert(e.message)
  }
}, [editor])

if(!editor) {
  return null;
}

  return (
    <div>
       <div className="border border-gray-500">
        {/* Header Functionality */}
        <div className="border-b border-gray-500 px-4 py-3 flex gap-1 items-center justify-between textEditorHeader">
          <div className="flex gap-8">
            <div className="flex gap-0.5">
                  <span onClick={()=> editor.chain().focus().toggleBold().run()} className={`${editor.isActive('bold') ? "bg-gray-500" : ""} editorBtn`}> B </span>
                  <span onClick={()=> editor.chain().focus().toggleItalic().run()} className={`${editor.isActive('italic') ? "bg-gray-500" : ""} editorBtn`}>I</span>
                  <span onClick={()=> editor.chain().focus().toggleUnderline().run()} className={`${editor.isActive('underline') ? "bg-gray-500" : ""} editorBtn`}>U</span>
                  <span onClick={()=> editor.chain().focus().toggleStrike().run()} className={`${editor.isActive('strike') ? "bg-gray-500" : ""} editorBtn line-through`}> del </span>
                  <span onClick={setLink} className={`${editor.isActive('link') ? "text-gray-400" : ""} editorBtn mt-1`}>
                    <FaLink />
                  </span>
            </div>
              {/* Heading title section */}
            <div className="flex">
                  <span onClick={()=> editor.chain().focus().toggleHeading({level: 1}).run()} className={`${editor.isActive('heading', {level: 1}) ? "bg-gray-500" : ""} editorBtn`}>h1</span>
                  <span onClick={()=> editor.chain().focus().toggleHeading({level: 2}).run()} className={`${editor.isActive('heading', {level: 2}) ? "bg-gray-500" : ""} editorBtn`}>h2</span>
                  <span onClick={()=> editor.chain().focus().toggleHeading({level: 3}).run()} className={`${editor.isActive('heading', {level: 3}) ? "bg-gray-500" : ""} editorBtn`}>h3</span>
                  <span onClick={()=> editor.chain().focus().toggleHeading({level: 4}).run()} className={`${editor.isActive('heading', {level: 4}) ? "bg-gray-500" : ""} editorBtn`}>h4</span>
                  <span onClick={()=> editor.chain().focus().toggleHeading({level: 5}).run()} className={`${editor.isActive('heading', {level: 5}) ? "bg-gray-500" : ""} editorBtn`}>h5</span>
                  <span onClick={()=> editor.chain().focus().toggleHeading({level: 6}).run()} className={`${editor.isActive('heading', {level: 6}) ? "bg-gray-500" : ""} editorBtn`}>h6</span>
                  <span onClick={() => editor.chain().focus().toggleSuperscript().run()} className={`${editor.isActive('superscript') ? "bg-gray-500" : ""} editorBtn mt-1`}> <FaSuperscript className="text-sm" /> </span>
                  <span onClick={()=> editor.chain().focus().setHorizontalRule().run()} className="text-sm font-semibold editorBtn">hr</span>
            </div>
            
          </div>
         
          
          <div className="flex gap-8">
            {/* Text Alignment section */}
            <div className="flex items-center">
                <span onClick={()=> editor.chain().focus().setTextAlign("left").run()} className={`${editor.isActive({textAlign: 'left'}) ? "bg-gray-500" : ""} editorBtn`}> <FaAlignLeft /> </span>
                <span onClick={()=> editor.chain().focus().setTextAlign('center').run()} className={`${editor.isActive({textAlign: 'center'}) ? "bg-gray-500" : ""} editorBtn`}> <FaAlignCenter /> </span>
                <span onClick={()=> editor.chain().focus().setTextAlign('right').run()} className={`${editor.isActive({textAlign: 'right'}) ? "bg-gray-500" : ""} editorBtn`}> <FaAlignRight /> </span>
                <span onClick={()=> editor.chain().focus().setTextAlign('justify').run()} className={`${editor.isActive({textAlign: 'justify'}) ? "bg-gray-500" : ""} editorBtn`}> <FaAlignJustify /> </span>
            </div>
            {/* List section */}
            <div className="flex gap-2 items-center">
                <span onClick={()=> editor.chain().focus().toggleBulletList().run()} className={`${editor.isActive('bulletList') ? "bg-gray-500" : ""} editorBtn`}> <FaListUl /> </span>
                <span onClick={()=> editor.chain().focus().toggleOrderedList().run()} className={`${editor.isActive('orderedList') ? "bg-gray-500" : ""} editorBtn`}> <FaListOl /> </span>
                
            </div>

            {/* Undo & Redo Section */}
            <div className="flex gap-2 items-center">
                <span onClick={()=> editor.chain().focus().undo().run()} className={`${editor.isActive('undo') ? "bg-gray-500" : ""} disabled:text-gray-400`} > <GrUndo /> </span>
                <span onClick={()=> editor.chain().focus().redo().run()} className={`${editor.isActive('redo') ? "bg-gray-500" : ""} disabled:text-gray-400`} > <GrRedo /> </span>
            </div>

          </div>

            {/* Color Pallete */}
            <div>
            <input
            type="color"
            className="w-10 h-6"
            onChange={(event: any) => editor.chain().focus().setColor(event.target?.value).run()}
            value={editor.getAttributes('textStyle').color || ""}
            data-testid="setColor"
          />
            </div>

          
            
        </div>
        {/* Content Area */}
        <div className="px-4 py-3 bg-gray-950">
            <EditorContent editor={editor} className="min-h-80 " />
            <input type="hidden" name="content" value={editor.getHTML()} />
        </div>
       </div>
    </div>
  )
}

export default Tiptap
