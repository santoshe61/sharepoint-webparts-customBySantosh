import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "CustomBySantoshWebPartStrings";
import CustomBySantosh from "./components/CustomBySantosh";
import { ICustomBySantoshProps } from "./components/ICustomBySantoshProps";

export interface ICustomBySantoshWebPartProps {
  title: string;
  tabsData: string;
}

export default class CustomBySantoshWebPart extends BaseClientSideWebPart<ICustomBySantoshWebPartProps> {
  public render(): void {
    const element: React.ReactElement<ICustomBySantoshProps> =
      React.createElement(CustomBySantosh, {
        tabsData: this.properties.tabsData,
        title: this.properties.title,
      });

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Custom web part",
          },
          groups: [
            {
              groupFields: [
                PropertyPaneTextField("title", {
                  label: "Webpart Title",
                }),
              ],
            },
            {
              groupName: "Tabs",
              groupFields: [
                PropertyPaneTextField("tabsData", {
                  label: "Tabs selector {title1:id1|title2:id2...}",
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
