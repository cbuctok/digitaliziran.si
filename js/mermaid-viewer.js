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
        let panX = 0;
        let panY = 0;
        const zoomIndicator = container.querySelector('.zoom-indicator');
        const mermaidDiv = container.querySelector('.mermaid');

        // Zoom controls
        container.querySelector('.zoom-out').addEventListener('click', function(e) {
            e.stopPropagation();
            if (zoomIndex > 0) {
                zoomIndex--;
                updateTransform();
            }
        });

        container.querySelector('.zoom-in').addEventListener('click', function(e) {
            e.stopPropagation();
            if (zoomIndex < ZOOM_LEVELS.length - 1) {
                zoomIndex++;
                updateTransform();
            }
        });

        // Fullscreen toggle
        container.querySelector('.fullscreen').addEventListener('click', function(e) {
            e.stopPropagation();
            container.classList.toggle('fullscreen');
            this.textContent = container.classList.contains('fullscreen') ? '✕' : '⛶';
            this.title = container.classList.contains('fullscreen') ? 'Exit fullscreen' : 'Fullscreen';
            // Reset pan when toggling fullscreen
            panX = 0;
            panY = 0;
            updateTransform();
        });

        // ESC to exit fullscreen
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && container.classList.contains('fullscreen')) {
                container.classList.remove('fullscreen');
                container.querySelector('.fullscreen').textContent = '⛶';
                container.querySelector('.fullscreen').title = 'Fullscreen';
                panX = 0;
                panY = 0;
                updateTransform();
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
                updateTransform();
            }
        }, { passive: false });

        // Pan/drag support using transforms
        let isDragging = false;
        let startX, startY, startPanX, startPanY;

        mermaidDiv.addEventListener('mousedown', function(e) {
            if (e.button !== 0) return; // Only left click
            isDragging = true;
            container.classList.add('dragging');
            startX = e.clientX;
            startY = e.clientY;
            startPanX = panX;
            startPanY = panY;
        });

        document.addEventListener('mouseup', function() {
            isDragging = false;
            container.classList.remove('dragging');
        });

        document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            e.preventDefault();
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            panX = startPanX + deltaX;
            panY = startPanY + deltaY;
            updateTransform();
        });

        function updateTransform() {
            const zoom = ZOOM_LEVELS[zoomIndex];
            zoomIndicator.textContent = Math.round(zoom * 100) + '%';
            const svg = mermaidDiv.querySelector('svg');
            if (svg) {
                svg.style.transform = `translate(${panX}px, ${panY}px) scale(${zoom})`;
            }
        }
    }
})();
