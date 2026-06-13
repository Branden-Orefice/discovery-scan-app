import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

const PageNotFound = () => {
  return (
    <section className="min-h-[100dvh] flex items-center px-4">
      <div className="mx-auto w-full max-w-7xl rounded-3xl border px-6 py-12 md:py-20 lg:py-32">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            404
          </h2>
          <p className="mt-4">
            Looks like you've ventured into the unknown digital realm.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link to="/auth/signin">
              <Button size="lg">
                <span>Return to sign in</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;
