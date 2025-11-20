import Preview from "@/components/Preview";
import Footer from "@/components/Footer";
import FormGenerator from "@/components/FormGenerator";
import AppContextProvider from "@/AppContextProvider";

export const defaultSize = 300;

export default function App() {
    return <>
        <AppContextProvider>
            <div className="bg-base-100 min-h-screen flex flex-col justify-between">
                <div className="max-w-3xl mx-auto flex flex-col gap-3 py-3">
                    <h5 className="text-3xl text-center text-primary font-bold mb-3">QR Generator</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 align-center items-start">
                        <FormGenerator />
                        <Preview />
                    </div>
                </div>
                <Footer />
            </div>
        </AppContextProvider>
    </>
}