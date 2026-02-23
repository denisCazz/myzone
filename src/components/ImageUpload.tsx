"use client";

import { useRef, useState } from "react";
import { Upload, X, ImageIcon } from "lucide-react";

type ImageUploadProps = {
  name: string;
  currentUrl?: string | null;
  label?: string;
  accept?: string;
};

export default function ImageUpload({ name, currentUrl, label = "Immagine", accept = "image/jpeg,image/png,image/webp" }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const displayUrl = preview || currentUrl;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
      setFileName(null);
    }
  };

  const clearFile = () => {
    setPreview(null);
    setFileName(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-secondary">{label}</label>

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Area upload / preview */}
        <div
          onClick={() => inputRef.current?.click()}
          className="relative flex-1 min-h-[200px] rounded-xl border-2 border-dashed border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer flex items-center justify-center overflow-hidden group"
        >
          <input
            ref={inputRef}
            type="file"
            name={name}
            accept={accept}
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          {displayUrl ? (
            <div className="relative w-full h-full min-h-[200px]">
              <img
                src={displayUrl}
                alt="Anteprima"
                className="w-full h-full min-h-[200px] object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-medium text-sm">Clicca per cambiare</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 py-8 px-4 text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                <Upload className="w-7 h-7" />
              </div>
              <div>
                <p className="font-medium text-secondary">Carica da PC</p>
                <p className="text-sm text-secondary/60 mt-0.5">JPG, PNG o WebP (max 5MB)</p>
              </div>
            </div>
          )}
        </div>

        {/* Info e pulsante rimuovi */}
        <div className="flex flex-col gap-2 sm:w-48">
          {fileName && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-primary text-sm">
              <ImageIcon className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{fileName}</span>
            </div>
          )}
          {displayUrl && (
            <button
              type="button"
              onClick={clearFile}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-primary/15 text-secondary/75 hover:bg-primary/5 text-sm font-medium transition-colors"
            >
              <X className="w-4 h-4" />
              Rimuovi
            </button>
          )}
        </div>
      </div>

      <p className="text-xs text-secondary/60">
        Oppure inserisci un URL nell&apos;apposito campo sotto.
      </p>
    </div>
  );
}
