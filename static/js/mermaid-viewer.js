/**
 * MermaidJS Viewer with zoom, fullscreen, and pan support
 */
(function() {
    'use strict';

    const ZOOM_LEVELS = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const DEFAULT_ZOOM_INDEX = 2; // 1x

    // Initialize mermaid
    mermaid.initialize({
        startOnLoad: false,
        theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default',
        securityLevel: 'loose'
    });

    // Wait for DOM
    document.addEventListener('DOMContentLoaded', function() {
        initMermaidDiagrams();
    });

    function initMermaidDiagrams() {
        // Find all mermaid code blocks
        const codeBlocks = document.querySelectorAll('pre code.language-mermaid, code.language-mermaid');

        codeBlocks.forEach(function(codeBlock, index) {
            const pre = codeBlock.closest('pre');
            if (!pre) return;

            const code = codeBlock.textContent;

            // Create container
            const container = document.createElement('div');
            container.className = 'mermaid-container';
            container.dataset.zoom = '1';

            // Create controls
            const controls = document.createElement('div');
            controls.className = 'mermaid-controls';
            controls.innerHTML = `
                <button class="zoom-out" title="Zoom out">−</button>
                <span class="zoom-indicator">100%</span>
                <button class="zoom-in" title="Zoom in">+</button>
                <button class="fullscreen" title="Fullscreen">⛶</button>
            `;

            // Create mermaid div
            const mermaidDiv = document.createElement('div');
            mermaidDiv.className = 'mermaid';
            mermaidDiv.textContent = code;

            container.appendChild(controls);
            container.appendChild(mermaidDiv);

            // Replace pre with container
            pre.parentNode.replaceChild(container, pre);

            // Render the diagram
            try {
                mermaid.run({ nodes: [mermaidDiv] });
            } catch (e) {
                console.error('Mermaid render error:', e);
            }

            // Setup controls
            setupControls(container, index);
        });
    }

    function setupControls(container, index) {
        let zoomIndex = DEFAULT_ZOOM_INDEX;
        const zoomIndicator = container.querySelector('.zoom-indicator');
        const mermaidDiv = container.querySelector('.mermaid');

        // Zoom controls
        container.querySelector('.zoom-out').addEventListener('click', function(e) {
            e.stopPropagation();
            if (zoomIndex > 0) {
                zoomIndex--;
                updateZoom();
            }
        });

        container.querySelector('.zoom-in').addEventListener('click', function(e) {
            e.stopPropagation();
            if (zoomIndex < ZOOM_LEVELS.length - 1) {
                zoomIndex++;
                updateZoom();
            }
        });

        // Fullscreen toggle
        container.querySelector('.fullscreen').addEventListener('click', function(e) {
            e.stopPropagation();
            container.classList.toggle('fullscreen');
            this.textContent = container.classList.contains('fullscreen') ? '✕' : '⛶';
            this.title = container.classList.contains('fullscreen') ? 'Exit fullscreen' : 'Fullscreen';
        });

        // ESC to exit fullscreen
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && container.classList.contains('fullscreen')) {
                container.classList.remove('fullscreen');
                container.querySelector('.fullscreen').textContent = '⛶';
                container.querySelector('.fullscreen').title = 'Fullscreen';
            }
        });

        // Mouse wheel zoom
        mermaidDiv.addEventListener('wheel', function(e) {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                if (e.deltaY < 0 && zoomIndex < ZOOM_LEVELS.length - 1) {
                    zoomIndex++;
                } else if (e.deltaY > 0 && zoomIndex > 0) {
                    zoomIndex--;
                }
                updateZoom();
            }
        }, { passive: false });

        // Pan/drag support
        let isDragging = false;
        let startX, startY, scrollLeft, scrollTop;

        mermaidDiv.addEventListener('mousedown', function(e) {
            if (e.button !== 0) return; // Only left click
            isDragging = true;
            container.classList.add('dragging');
            startX = e.pageX - mermaidDiv.offsetLeft;
            startY = e.pageY - mermaidDiv.offsetTop;
            scrollLeft = mermaidDiv.scrollLeft;
            scrollTop = mermaidDiv.scrollTop;
        });

        document.addEventListener('mouseup', function() {
            isDragging = false;
            container.classList.remove('dragging');
        });

        document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - mermaidDiv.offsetLeft;
            const y = e.pageY - mermaidDiv.offsetTop;
            const walkX = (x - startX) * 1.5;
            const walkY = (y - startY) * 1.5;
            mermaidDiv.scrollLeft = scrollLeft - walkX;
            mermaidDiv.scrollTop = scrollTop - walkY;
        });

        function updateZoom() {
            const zoom = ZOOM_LEVELS[zoomIndex];
            container.dataset.zoom = zoom.toString();
            zoomIndicator.textContent = Math.round(zoom * 100) + '%';
        }
    }
})();
