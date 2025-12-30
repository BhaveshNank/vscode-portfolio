'use client';

import { useState } from 'react';
import { ZoomIn, ZoomOut, Download } from 'lucide-react';

interface PDFViewerProps {
  fileName: string;
  filePath: string;
}

export default function PDFViewer({ fileName, filePath }: PDFViewerProps) {
  const [zoom, setZoom] = useState(100);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));

  // Calculate scale factor
  const scale = zoom / 100;

  return (
    <div className="h-full flex flex-col bg-vscode-bg">
      {/* PDF Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-vscode-sidebar border-b border-vscode-border">
        <div className="flex items-center gap-3">
          <span className="text-sm text-vscode-textMuted">PDF</span>
          <span className="text-vscode-border">|</span>
          <span className="text-sm text-vscode-text">{fileName}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            disabled={zoom <= 50}
            className="p-1.5 hover:bg-vscode-hover rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Zoom Out"
          >
            <ZoomOut size={16} className="text-vscode-text" />
          </button>
          
          <span className="text-sm text-vscode-text min-w-[60px] text-center">
            {zoom}%
          </span>
          
          <button
            onClick={handleZoomIn}
            disabled={zoom >= 200}
            className="p-1.5 hover:bg-vscode-hover rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Zoom In"
          >
            <ZoomIn size={16} className="text-vscode-text" />
          </button>
          
          <span className="text-vscode-border mx-2">|</span>
          
          <a
            href={filePath}
            download
            className="p-1.5 hover:bg-vscode-hover rounded transition-colors"
            title="Download PDF"
          >
            <Download size={16} className="text-vscode-text" />
          </a>
        </div>
      </div>

      {/* PDF Content */}
      <div className="flex-1 overflow-auto bg-[#525252] p-1">
        <div 
          className="bg-white transition-transform duration-300 ease-in-out origin-top-left"
          style={{ 
            transform: `scale(${scale})`,
            width: `${100 / scale}%`,
            height: `${100 / scale}%`
          }}
        >
          <iframe
            src={`${filePath}#toolbar=0&navpanes=0`}
            className="w-full h-full"
            style={{ 
              border: 'none'
            }}
            title={fileName}
          />
        </div>
      </div>
    </div>
  );
}
