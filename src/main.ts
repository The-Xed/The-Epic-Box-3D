import { TheEpicBox3D } from "./TheEpicBox3D";

async function animate(metaboxial_camera: TheEpicBox3D, screen: HTMLImageElement){
  for await(let frame of metaboxial_camera.getRenderFrames()){
    screen.src = frame;
  }
}

window.addEventListener("load", () => {
  let args: URL = new URL(window.location.href);
  if(window.location.search == ""){
    args.searchParams.append("resolution", "2048");
    args.searchParams.append("manual", "false");
    window.location.replace(args.href);
  }
  else{
    if(args.searchParams.has("resolution")&&args.searchParams.has("manual")){
      if(args.searchParams.get("manual")!.toUpperCase() == "TRUE"){
        let The_Epic_Box: TheEpicBox3D = new TheEpicBox3D(parseInt(args.searchParams.get("resolution")!), true);
        animate(The_Epic_Box, document.getElementById("output") as HTMLImageElement);
        document.addEventListener("keydown", (evt) => {
          if(evt.code == "Space"){
            The_Epic_Box.next();
          }
        });
      }
      else{
        animate(new TheEpicBox3D(parseInt(args.searchParams.get("resolution")!), false), document.getElementById("output") as HTMLImageElement);
      }
    }
    else{
      for(let key in args.searchParams.keys()){
        args.searchParams.delete(key);
      }
      args.searchParams.append("resolution", "2048");
      args.searchParams.append("manual", "2048");
      window.location.replace(args.href);
    }
  }
});