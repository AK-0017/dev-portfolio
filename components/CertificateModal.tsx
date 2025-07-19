"use client";

import React, { useEffect, useState } from "react";

type CertificateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  file: string;
};

const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  title,
  file,
}) => {
  const [fileExists, setFileExists] = useState(true);

  useEffect(() => {
    if (file && isOpen) {
      fetch(`/certificates/${file}`, { method: "HEAD" })
        .then((res) => setFileExists(res.ok))
        .catch(() => setFileExists(false));
    }
  }, [file, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-zinc-900 rounded-xl p-6 max-w-2xl w-full relative">
        <button
          className="absolute top-2 right-3 text-white text-xl"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-lg font-semibold mb-4 text-white">{title}</h2>

        {fileExists ? (
          <iframe
            src={`/certificates/${file}`}
            className="w-full h-[500px] border rounded"
          ></iframe>
        ) : (
          <p className="text-center text-white mt-8 text-base font-medium">
            📄 Certificate Coming Soon...
          </p>
        )}
      </div>
    </div>
  );
};

export default CertificateModal;
