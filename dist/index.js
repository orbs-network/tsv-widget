"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const code_highlighter_1 = require("./code-highlighter");
const codeMirrorCss = require("codemirror/lib/codemirror.css").toString();
const style = require("./style.css");
const template = document.createElement('template');
/**
 *
 */
class TSVWidgetElement extends HTMLElement {
    /**
     *
     */
    constructor() {
        super();
        this.sources = {};
        this.selectedFile = null;
        this.ipfsProvider = this.getAttribute('ipfs-provider');
        this.verifiedContractUrl = this.getAttribute('verified-contract-url');
        this.theme = this.getAttribute('theme');
        this.layout = this.getAttribute('layout');
        this.attachShadow({ mode: 'open' });
    }
    /**
     * Runs each time the element is appended to or moved in the DOM
     */
    connectedCallback() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('connected!', this);
            this.ch = new code_highlighter_1.default(this.theme);
            yield this.buildContainer();
            yield this.fetchSources();
            yield this.buildTabs();
            this.selectFile(this.selectedFile);
        });
    }
    /**
     * fetch sources from the verified contract json url
     */
    fetchSources() {
        return __awaiter(this, void 0, void 0, function* () {
            let url = this.ipfsProvider + '/ipfs/' + this.verifiedContractUrl.replace('ipfs://', '');
            this.verifiedContract = yield (yield fetch(url)).json();
            yield Promise.all(this.verifiedContract.sources.map((source) => __awaiter(this, void 0, void 0, function* () {
                url = this.ipfsProvider + '/ipfs/' + source.url.replace('ipfs://', '');
                const resp = yield fetch(url);
                this.sources[source.fileName] = yield resp.text();
            })));
            this.loadingCurtain.classList.remove('visible');
        });
    }
    /**
     * builds the external container element and appends it to the shadow root
     */
    buildContainer() {
        return __awaiter(this, void 0, void 0, function* () {
            template.innerHTML = `      
                <style>${codeMirrorCss}</style>
                <style>${style}</style>     
                
                <div part="container-tabs" class="container-tabs ${this.layout === 'vertical' ? 'vertical' : ''} ${this.theme === 'dark' ? 'dark' : ''}">
                    
                    <div id="loading-curtain" class="loading-curtain visible">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin:auto;background:transparent;display:block;" width="80px" height="80px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                        <g transform="rotate(0 50 50)">
                          <rect x="48.5" y="23.5" rx="0" ry="0" width="3" height="13" fill="#bcbcbc">
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8888888888888888s" repeatCount="indefinite"></animate>
                          </rect>
                        </g><g transform="rotate(40 50 50)">
                          <rect x="48.5" y="23.5" rx="0" ry="0" width="3" height="13" fill="#bcbcbc">
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.7777777777777778s" repeatCount="indefinite"></animate>
                          </rect>
                        </g><g transform="rotate(80 50 50)">
                          <rect x="48.5" y="23.5" rx="0" ry="0" width="3" height="13" fill="#bcbcbc">
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
                          </rect>
                        </g><g transform="rotate(120 50 50)">
                          <rect x="48.5" y="23.5" rx="0" ry="0" width="3" height="13" fill="#bcbcbc">
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5555555555555556s" repeatCount="indefinite"></animate>
                          </rect>
                        </g><g transform="rotate(160 50 50)">
                          <rect x="48.5" y="23.5" rx="0" ry="0" width="3" height="13" fill="#bcbcbc">
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4444444444444444s" repeatCount="indefinite"></animate>
                          </rect>
                        </g><g transform="rotate(200 50 50)">
                          <rect x="48.5" y="23.5" rx="0" ry="0" width="3" height="13" fill="#bcbcbc">
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate>
                          </rect>
                        </g><g transform="rotate(240 50 50)">
                          <rect x="48.5" y="23.5" rx="0" ry="0" width="3" height="13" fill="#bcbcbc">
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.2222222222222222s" repeatCount="indefinite"></animate>
                          </rect>
                        </g><g transform="rotate(280 50 50)">
                          <rect x="48.5" y="23.5" rx="0" ry="0" width="3" height="13" fill="#bcbcbc">
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.1111111111111111s" repeatCount="indefinite"></animate>
                          </rect>
                        </g><g transform="rotate(320 50 50)">
                          <rect x="48.5" y="23.5" rx="0" ry="0" width="3" height="13" fill="#bcbcbc">
                            <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate>
                          </rect>
                        </g>
                    </svg>
                    </div>
                    
                    <div part="tabs-buttons" id="tabs-buttons" class="nav nav-tabs">                       
                    </div>
                    <div part="tab-content" class="tab-content">
                        <textarea class="cm-host-textarea" id="cm-host"></textarea>
                    </div>
                </div>           
                `;
            this.shadowRoot.appendChild(template.content.cloneNode(true));
        });
    }
    /**
     * builds the html tabs
     */
    buildTabs() {
        return __awaiter(this, void 0, void 0, function* () {
            let tabsButtons = '';
            let index = 0;
            for (const sourceMetadata of this.verifiedContract.sources) {
                const fileName = sourceMetadata.fileName;
                tabsButtons += `<div part="tab-button" class="tab-button ${index === 0 ? 'active' : ''}" file-name="${fileName}">
                                     ${fileName}
                                    </div>`;
                if (index === 0) {
                    this.selectedFile = fileName;
                }
                index++;
            }
            this.tabsButtons.innerHTML = tabsButtons;
            yield this.ch.init(this.shadowRoot, this.cmHost);
            const tabButtonsElements = this.shadowRoot.querySelectorAll("div.nav-tabs div.tab-button ");
            for (const tabButtonsElement of tabButtonsElements) {
                tabButtonsElement.addEventListener("click", () => {
                    for (const _tabButtonsElement of tabButtonsElements) {
                        if (_tabButtonsElement !== tabButtonsElement) {
                            _tabButtonsElement.classList.remove('active');
                        }
                    }
                    tabButtonsElement.classList.add('active');
                    this.selectFile(tabButtonsElement.getAttribute('file-name'));
                });
            }
        });
    }
    /**
     * select a specific file and corresponding tab
     *
     * @param fileName
     */
    selectFile(fileName) {
        this.selectedFile = this.sources[fileName];
        this.ch.setCode(this.selectedFile);
    }
    /**
     * Runs when the element is removed from the DOM
     */
    disconnectedCallback() {
        console.log('disconnected', this);
    }
    /**
     *
     */
    get tabsButtons() {
        return this.shadowRoot.getElementById('tabs-buttons');
    }
    /**
     *
     */
    get loadingCurtain() {
        return this.shadowRoot.getElementById('loading-curtain');
    }
    /**
     *
     */
    get cmHost() {
        return this.shadowRoot.getElementById('cm-host');
    }
}
exports.default = TSVWidgetElement;
// Define the new web component
if ('customElements' in window) {
    window.customElements.define('tsv-widget', TSVWidgetElement);
}
//# sourceMappingURL=index.js.map