var catalog = JSON.parse(
    `
    {
        "Architecture": [
          {
            "Auth. & Security": [],
            "Data Model": [
              "Directional Executable",
              "Single Connection Executable"
            ],
            "Process Flow": [
              "Insert",
              "Update",
              "Upsert",
              "Delete",
              "Undelete",
              "Merge"
            ]
          }
        ],
        "Setup":[{
                
                "Permissions":[],
                "Connection":[
                    "Is Current Org",
                    "Username & Password",
                    "OAuth2"
                ],
                "Trigger":[
                    "Example - Hook Trigger",
                    "Sharing Rule - All Internal Users"
                ]
            }
        ],

        "Transformation": [
          "Elements of Mapping",
          "Calculate Field Values"
        ],

        "Recipes": [{
            "Q":[
                "Build a SOQL String",
                "Parse a SOQL String",
                "Manage SOQLs",
                "Run a Query", 
                "Inline Editing",
                "Mass Editing",
                "Dynamic Query",
                "Data Mash-ups"
            ],
            "Data List":[
                "Executable Data List",
                "Actionable Data List in User Context",
                "Pipeline Data Lists",
                "Required Custom Permission to View",
                "Edit Target Fields before Action",
                "Required Custom Permission to Execute",
                "Toggle SOQL Manager"
            ],
            "Batch Jobs": [
                "Close Stagnant Cases",
                "Create Tasks for Escalated Cases",
                "Delete Obsolete Cases",
                "Restore Deleted Cases",
                "Aggregate Large Data Volumes"
            ],
            "Triggers": [
                "Self-Adaptive Trigger for Aggregations"
            ],
            "Record-Based Configurations": ["Deploy DSP Configurations"],
            "Sandbox Management": ["Seed Relational Data"]
        }]
      }
    `
);
/*
                "Direction":[
                    "Quick Executable(Direction)"
                ]
"Metadata":[
  {
    "Connection": [
      "Auth. Options",
      "Connection Quick Actions"
    ],
    "Direction": [],
    "Pipeline": [
      "Pipeline Builder",
      "Determine Sequence",
      "Pipeline Quick Actions"
    ],
    "Executable": [
      "Executable Quick Actions"
    ]
  }
],*/

function getNavigationHtml() {

    return `
    <nav class="slds-nav-vertical" aria-label="Sub page">
        <div class="slds-form-element slds-p-horizontal_large">
            <label class="slds-form-element__label slds-assistive-text" for="input-id-01">Filter navigation
                items</label>
            <div class="slds-form-element__control slds-input-has-icon slds-input-has-icon_left">
                <span class="slds-icon_container slds-icon-utility-search">
                </span><!--
                <input type="search" id="input-id-01" placeholder="Quick Find" class="slds-input" />-->
            </div>
        </div>

        <div id="catalog">
            ${getSectionHtml()}
        </div>

    </nav>`;
}

function getSectionHtml() {

    var ret = '';

    for (let section in catalog) {

        let fileNameSection = getHtmlFileName(section);


        let activeClassNameSection = currentFileName() == fileNameSection ? 'slds-is-active' : 'slds-is-inactive';

        ret += `<div class="slds-nav-vertical__section">
            <a href="${fileNameSection}.html">
            <h2 id="entity-header" class="slds-nav-vertical__title slds-nav-vertical__item ${activeClassNameSection}">
            ${section}
            </h2></a> 
            <ul aria-describedby="entity-header">`;

        let subSections = catalog[section];

        for (let i in subSections) {

            if (typeof subSections[i] == 'object') {

                let keys = Object.keys(subSections[i]);

                for (let j in keys) {

                    let fileNameSubSection = getHtmlFileNameSubSection(section, keys[j]);

                    let activeClassNameSubSection = currentFileName() == fileNameSubSection ? 'slds-is-active' : 'slds-is-inactive';

                    ret += `<li class="">
                        <div class="slds-nav-vertical__item ${activeClassNameSubSection}" style="font-size:15px;">
                        <a href="${fileNameSubSection}.html" class="slds-nav-vertical__action " >${keys[j]}</a></div>
                        `;

                    let grandChildren = subSections[i][keys[j]];

                    if (grandChildren.length > 0) {

                        ret += '<ul aria-describedby="entity-header">';

                        for (let k in grandChildren) {

                            //console.log('grandChildren[k]: ' + grandChildren[k]);

                            let fileNameGrandSection = getHtmlFileNameSubSection(section, grandChildren[k]);

                            let activeClassNameSubSection = currentFileName() == fileNameGrandSection ? 'slds-is-active' : 'slds-is-inactive';

                            ret += `<li class="slds-nav-vertical__item ${activeClassNameSubSection}">
                                <a href="${fileNameGrandSection}.html" class="slds-nav-vertical__action" >${grandChildren[k]}</a>
                                </li>`;
                        }

                        ret += '</ul>';
                    }

                    ret += '</li>';
                }
            }
            else {

                let fileNameSubSection = getHtmlFileNameSubSection(section, subSections[i]);

                let activeClassNameSubSection = currentFileName() == fileNameSubSection ? 'slds-is-active' : 'slds-is-inactive';

                ret += `<li class="slds-nav-vertical__item ${activeClassNameSubSection}">
                    <a href="${fileNameSubSection}.html" class="slds-nav-vertical__action" >${subSections[i]}</a>
                    </li>`;
            }
        }

        ret += '</ul></div>';
    }

    return ret;
}

function currentFileName() {

    let path = window.location.pathname;
    let page = path.split("/").pop();

    let ret = page.substr(0, page.indexOf("."));

    return ret;
}


function getSectionHtml2() {

    var ret = '';

    for (let section in catalog) {

        ret += '<div class="slds-nav-vertical__section">'
            + '<a href="' + getHtmlFileName(section) + '">'
            + '<h2 id="entity-header" class="slds-nav-vertical__title">'
            + section
            + '</h2></a>'
            + '<ul aria-describedby="entity-header">';

        let subSections = catalog[section];

        for (let i in subSections) {

            let fileName = getHtmlFileNameSubSection(section, subSections[i]);

            let activeClassName = fileName == currentSection ? 'slds-is-active' : 'slds-is-inactive';

            ret += '<li class="slds-nav-vertical__item ' + activeClassName + '">' +
                '<a href="' + fileName + '" class="slds-nav-vertical__action" >' + subSections[i] + '</a>' +
                '</li>';
        }

        ret += '</ul></div>';
    }

    return ret;
}

function getHtmlFileName(sectionName) {

    return sectionName.toLowerCase().replaceAll('.', ' ').replaceAll('(', ' ').replaceAll(')', '').replaceAll('&', ' ').replaceAll(',', ' ').replaceAll('+', ' ').replaceAll('-', ' ').replaceAll(/\s+/g, '_');
}

function getHtmlFileNameSubSection(sectionName, subSectionName) {

    return getHtmlFileName(sectionName) + '_' + getHtmlFileName(subSectionName);
}

window.onload = function () {

    document.getElementById("nav").innerHTML = getNavigationHtml();

    const styleElement = document.createElement('style');
    styleElement.textContent = `
        body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden;
        }
        .split-container {
            display: flex;
            height: 100vh;
            overflow: hidden;
           
        }
        #nav {
            width: 320px;
            min-width: 320px; 
            height: 100%;
            overflow-y: auto;
            padding-bottom: 3rem;
        }
        .content-container {
            flex-grow: 1;
            overflow-y: auto;
            padding-top: 1rem;
            padding-right: 1rem;
            padding-bottom: 1rem;
        }
    `;
    document.head.appendChild(styleElement);

    const mainContent = document.querySelector('.container');
    const contentContainer = document.createElement('div');
    contentContainer.className = 'content-container';
    mainContent.parentNode.insertBefore(contentContainer, mainContent);
    contentContainer.appendChild(mainContent);

    const splitContainer = document.createElement('div');
    splitContainer.className = 'split-container';
    document.body.insertBefore(splitContainer, document.body.firstChild);
    splitContainer.appendChild(document.getElementById('nav'));
    splitContainer.appendChild(contentContainer);
};