import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const categories = [
  { value: "all", label: "All" },
  { value: "automotive", label: "Auto" },
  { value: "aircraft", label: "Aero" },
  { value: "watercraft", label: "Marine" },
];

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
    axios.get(`${API}/gallery`).then((r) => setImages(r.data)).catch(() => {});
  }, []);

  const filtered = filter === "all" ? images : images.filter((img) => img.category === filter);

  return (
    <section id="gallery" data-testid="gallery-section" className="py-24 lg:py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">
            Portfolio
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight uppercase text-white">
            Our Work
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-10">
          <Tabs defaultValue="all" onValueChange={setFilter}>
            <TabsList className="bg-[#111111] border border-white/10 h-10">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat.value}
                  value={cat.value}
                  data-testid={`gallery-tab-${cat.value}`}
                  className="text-xs font-semibold tracking-wider uppercase data-[state=active]:bg-white data-[state=active]:text-black"
                >
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((img) => (
            <div
              key={img.id}
              data-testid={`gallery-image-${img.id}`}
              className="relative group rounded-lg overflow-hidden aspect-[4/3] cursor-pointer"
              onClick={() => setSelectedImg(img)}
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
                <div className="p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                  <p className="text-white text-sm font-medium">{img.alt}</p>
                  <p className="text-gray-400 text-xs capitalize">{img.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImg && (
          <div
            data-testid="gallery-lightbox"
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedImg(null)}
          >
            <div className="relative max-w-4xl w-full">
              <img
                src={selectedImg.url}
                alt={selectedImg.alt}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              <p className="text-center text-gray-400 text-sm mt-4">{selectedImg.alt}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
