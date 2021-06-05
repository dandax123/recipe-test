import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const Home: BlitzPage = () => {
  return (
    <>
      <div className="w-full h-full">
        <div className="grid grid-cols-1">
          <img src="/header.jpg" className="w-full md:h-80 object-cover" alt="img-1" />
        </div>
        <div className="grid grid-cols-2 justify-items-center place-items-center">
          <div className="md:p-8 flex items-center p-4">
            <div className="grid grid-col-1">
              <div className="col-span-1">
                <h1 className="text-xl md:text-4xl block font-bold">Save Recipes of your choice</h1>
              </div>
              <div className="col-span-1">
                <h4 className="block pt-3">
                  Save the URL of any recipe you find online. RecipeBox saves just the recipe to let
                  you focus on cooking. For even easier saving use our iOS app.
                </h4>
              </div>
            </div>
          </div>
          <div className="p-3 md:p-8 flex items-center ">
            <img
              alt="img-2"
              src="https://www.getrecipebox.com/assets/img/app-recipes-screenshots.png"
              className=""
            ></img>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="p-3 md:p-8 flex items-center">
            <img
              src="https://www.getrecipebox.com/assets/img/app-screenshots.png"
              alt="img-3"
            ></img>
          </div>
          <div className="md:p-8 flex items-center p-4">
            <div className="grid grid-col-1">
              <div className="col-span-1">
                <h1 className="text-xl md:text-4xl block font-bold">Save Recipes of your choice</h1>
              </div>
              <div className="col-span-1">
                <h4 className="block pt-3">
                  Save the URL of any recipe you find online. RecipeBox saves just the recipe to let
                  you focus on cooking. For even easier saving use our iOS app.
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="md:p-8 flex items-center p-4">
            <div className="grid grid-col-1">
              <div className="col-span-1">
                <h1 className="text-xl md:text-4xl block font-bold">Save Recipes of your choice</h1>
              </div>
              <div className="col-span-1">
                <h4 className="block pt-3">
                  Save the URL of any recipe you find online. RecipeBox saves just the recipe to let
                  you focus on cooking. For even easier saving use our iOS app.
                </h4>
              </div>
            </div>
          </div>
          <div className="p-3 flex items-center md:p-8">
            <img
              src="https://www.getrecipebox.com/assets/img/category-screenshots.png"
              alt="img-4"
            ></img>
          </div>
        </div>
      </div>
    </>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
