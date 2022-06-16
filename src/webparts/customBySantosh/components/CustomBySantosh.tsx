import * as React from "react";
import styles from "./CustomBySantosh.module.scss";
import { ICustomBySantoshProps } from "./ICustomBySantoshProps";
import { escape } from "@microsoft/sp-lodash-subset";

export default class CustomBySantosh extends React.Component<
  ICustomBySantoshProps,
  {}
> {
  private tabIds: string[] = [];
  public openTab(id: string) {
    this.tabIds.forEach((tabId) => {
      document.getElementById(tabId).style.display = "none";
      document.getElementById("tab-" + tabId).classList.remove("isActive");
    });
    document.getElementById("tab-" + id).classList.add("isActive");
    document.getElementById(id).style.display = "block";
  }
  public render(): React.ReactElement<ICustomBySantoshProps> {
    console.log(this.props.tabsData);
    return (
      <div className={styles.customBySantosh}>
        <div className={styles.tabs}>
          {this.props.tabsData?.split("|")?.map((tabData, index) => {
            let [title, id] = tabData.split(":");
            this.tabIds.push(id);
            if (index !== 0) {
              document.getElementById(id).style.display = "none";
            }
            return (
              <button
                onClick={(event: React.MouseEvent<HTMLElement>) => {
                  this.openTab(id);
                }}
                id={"tab-" + id}
                className={[
                  styles.tabsTitle,
                  index === 0 ? "isActive" : "",
                ].join(" ")}
              >
                {title}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}
