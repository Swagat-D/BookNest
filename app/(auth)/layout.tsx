import React, { ReactNode } from 'react'
import Image from 'next/image'

const layout = ({children}: { children: ReactNode}) => {
  return (
    <main className="auth-container">
      <section className="auth-form">
        <div className="auth-box">
          <Image src="/logo.svg" alt="Logo" width={37} height={37} />
          <h1 className="text-2xl font-semibold text-white">BookNest</h1>
        </div>
      </section>
    </main>
  );
}

export default layout
