"use client";

import { Header } from "../components/Header";

export default function TagPage() {
  return (
    <>
      <div>
        <div className="py-8">
          <Header
            title="Tag"
            haveButton={true}
            buttonTitle="Add Tag"
            buttonCallback={() => {}}
          />
        </div>
      </div>
    </>
  );
}
