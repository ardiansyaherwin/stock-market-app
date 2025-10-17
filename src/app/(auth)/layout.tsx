import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="auth-layout">
      <section className="auth-left-section scrollbar-hide-default">
        <Link href="/" className="auth-logo">
          <Image
            src="/assets/icons/logo.svg"
            alt="Stock Market App"
            width={32}
            height={32}
          />
        </Link>
        <div className="pb-6 lg:pb-8 flex-1">{children}</div>
      </section>
      <section className="auth-right-section">
        <div className="z-10 relative mt-4 lg:mt-16">
          <blockquote className="auth-blockquote">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem,
            ratione itaque! Ipsa deserunt, dolores a magni iusto sit rerum unde
            sunt, dicta possimus eaque quisquam, pariatur incidunt nisi
            voluptatibus iure.
          </blockquote>
          <div className="flex items-center justify-between">
            <div>
              <cite className="auth-testimonial-author">- John Doe</cite>
              <p className="max-md:text-xs text-gray-500">Retail Investor</p>
            </div>
            <div className="flex items-center gap-1 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Image
                  src="/assets/icons/star.svg"
                  alt="Star"
                  key={star}
                  width={16}
                  height={16}
                  className="h-4 w-4"
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 relative mt-12">
          <Image
            src="/assets/images/dashboard.png"
            alt="Dashboard Preview"
            width={1440}
            height={1150}
            className="auth-dashboard-preview absolute top-0"
          />
        </div>
      </section>
    </main>
  );
};

export default AuthLayout;
