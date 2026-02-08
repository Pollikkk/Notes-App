import "./TextEditor.css"
import { useEffect, useRef } from "react";

export default function RichTextEditor({
        value,
        onChange,
        className = "",
        placeholder = "Введите текст…",
    }) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (el.innerHTML !== (value ?? "")) el.innerHTML = value ?? "";
    }, [value]);

    const emitChange = () => {
        const el = ref.current;
        if (!el) return;
        onChange?.(el.innerHTML);
    };

    const cmd = (command) => {
        ref.current?.focus();
        document.execCommand(command);
        emitChange();
    };

    return (
        <div className={className}>
            <div className="teToolbar">
                <button className="teButton" onClick={() => cmd("bold")}>B</button>
                <button className="teButton" onClick={() => cmd("italic")}>I</button>
                <button className="teButton" onClick={() => cmd("removeFormat")}>Normal</button>
            </div>

            <div
                ref={ref}
                className="teEditor"
                contentEditable
                suppressContentEditableWarning
                data-placeholder={placeholder}
                onInput={emitChange}
            />
        </div>
    );
}
