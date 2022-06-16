import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { escape } from "@microsoft/sp-lodash-subset";

import styles from "./ElementRemoverByClassSpfxWebPart.module.scss";
import * as strings from "ElementRemoverByClassSpfxWebPartStrings";

export interface IElementRemoverByClassSpfxWebPartProps {
  teacherSelectors: string;
  studentSelectors: string;
}

export default class ElementRemoverByClassSpfxWebPart extends BaseClientSideWebPart<IElementRemoverByClassSpfxWebPartProps> {
  public render(): void {
    let _this = this;
    document.getElementsByTagName("body")[0].addEventListener(
      "DOMNodeInserted",
      (e) => {
        try {
          `${_this.properties.teacherSelectors}`
            .split(",")
            .forEach((selector) => {
              if (
                selector &&
                !_this.context.pageContext.legacyPageContext.isSiteOwner
              ) {
                document.querySelector(selector)?.remove();
              }
            });
          `${_this.properties.studentSelectors}`
            .split(",")
            .forEach((selector) => {
              if (
                selector &&
                (!_this.context.pageContext.legacyPageContext.isSiteOwner ||
                  _this.context.pageContext.legacyPageContext
                    .isAnonymousGuestUser)
              ) {
                document.querySelector(selector)?.remove();
              }
            });
        } catch (err) {
          console.log("Unable to apply custom webpart", err);
        }
      },
      false
    );

    this.domElement.innerHTML = "Pega UAP";
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("teacherSelectors", {
                  label: "Selectors to remove for Teachers ",
                }),
                PropertyPaneTextField("studentSelectors", {
                  label: "Selectors to remove for Students ",
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
