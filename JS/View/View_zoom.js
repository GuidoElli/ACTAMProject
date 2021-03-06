class View_zoom {
   constructor(view) {
      this.v = view;

      this.container = $(".zoom_box")[0];

      this.zoom_playback_prevs_box = $(".zoom_playback_prevs_box")[0];
      this.zoom_vol_edit_prevs_box = $(".zoom_vol_edit_prevs_box")[0];
      this.zoom_freq_edit_prevs_box = $(".zoom_freq_edit_prevs_box")[0];
      this.zoom_chroma_edit_prevs_box = $(".zoom_chroma_edit_prevs_box")[0];


      //Cloning
      let content

      let first_zoom_playback_prev = $(".zoom_playback_prevs_box .prev_section")[0];
      content = first_zoom_playback_prev.innerHTML;
      this.zoom_playback_prevs_box.innerHTML = "";
      for (let i = 0; i < TOTAL_TRACKS; i++) {
         let clone_playback = first_zoom_playback_prev.cloneNode();
         clone_playback.innerHTML = content;
         this.zoom_playback_prevs_box.append(clone_playback);
         clone_playback.style.width = 100 / TOTAL_TRACKS + "%";
      }

      let first_zoom_vol_edit_prev = $(".zoom_vol_edit_prevs_box .prev_section")[0];
      content = first_zoom_vol_edit_prev.innerHTML;
      this.zoom_vol_edit_prevs_box.innerHTML = "";
      for (let i = 0; i < TOTAL_TRACKS; i++) {
         let clone_vol_edit = first_zoom_vol_edit_prev.cloneNode();
         clone_vol_edit.innerHTML = content;
         this.zoom_vol_edit_prevs_box.append(clone_vol_edit);
         clone_vol_edit.style.width = 100 / TOTAL_TRACKS + "%";
      }

      let first_zoom_freq_edit_prev = $(".zoom_freq_edit_prevs_box .prev_section")[0];
      content = first_zoom_freq_edit_prev.innerHTML;
      this.zoom_freq_edit_prevs_box.innerHTML = "";
      for (let i = 0; i < TOTAL_TRACKS; i++) {
         let clone_freq_edit = first_zoom_freq_edit_prev.cloneNode();
         clone_freq_edit.innerHTML = content;
         this.zoom_freq_edit_prevs_box.append(clone_freq_edit);
         clone_freq_edit.style.width = 100 / TOTAL_TRACKS + "%";
      }

      let first_zoom_chroma_edit_prev = $(".zoom_chroma_edit_prevs_box .prev_section")[0];
      content = first_zoom_chroma_edit_prev.innerHTML;
      this.zoom_chroma_edit_prevs_box.innerHTML = "";
      for (let i = 0; i < TOTAL_TRACKS; i++) {
         let clone_chroma_edit = first_zoom_chroma_edit_prev.cloneNode();
         clone_chroma_edit.innerHTML = content;
         this.zoom_chroma_edit_prevs_box.append(clone_chroma_edit);
         clone_chroma_edit.style.width = 100 / TOTAL_TRACKS + "%";
      }


      this.zoom_playback_prevs = $(".zoom_playback_prev");
      this.zoom_vol_edit_prevs = $(".zoom_vol_edit_prev");
      this.zoom_freq_edit_prevs = $(".zoom_freq_edit_prev");
      this.zoom_chroma_edit_prevs = $(".zoom_chroma_edit_prev");

      this.zoom_slider = $(".zoom_slider")[0];


      //MOUSE

      this.old_mouse_x = null;
      this.new_mouse_x = null;

      this.container.addEventListener("mousedown", (e) => {
         this.editing = true;
         this.old_mouse_x = e.pageX;
         this.new_mouse_x = e.pageX;
         let left = this.container.getBoundingClientRect().left;
         let right = this.container.getBoundingClientRect().right;
         let track = Math.floor(TOTAL_TRACKS * (this.new_mouse_x - left) / (right - left));

         this.v.on_zoom_slider_set(track);
      })

      document.addEventListener("mousemove", (e) => {
         if (this.editing) {
            this.new_mouse_x = (e.pageX) ? e.pageX : this.new_mouse_x;
            let left = this.container.getBoundingClientRect().left;
            let right = this.container.getBoundingClientRect().right;
            let track = Math.floor(TOTAL_TRACKS * (this.new_mouse_x - left) / (right - left));

            this.v.on_zoom_slider_set(track);
         }
      })

      document.addEventListener("mouseup", () => {
         if (this.editing) {
            this.editing = false;
         }
      })

      this.container.addEventListener("mousewheel", (e) => {
         this.v.on_zoom_slider_wheel(e.wheelDelta > 0);
      })


      this.zoom_plus_button = $(".zoom_plus_button")[0];
      this.zoom_minus_button = $(".zoom_minus_button")[0];
      this.zoom_left_button = $(".zoom_left_button")[0];
      this.zoom_right_button = $(".zoom_right_button")[0];

      this.zoom_plus_button.addEventListener("click", () => {
         this.v.on_zoom_plus_button_click();
      })
      this.zoom_minus_button.addEventListener("click", () => {
         this.v.on_zoom_minus_button_click();
      })
      this.zoom_left_button.addEventListener("click", () => {
         this.v.on_zoom_left_button_click();
      })
      this.zoom_right_button.addEventListener("click", () => {
         this.v.on_zoom_right_button_click();
      })

   }



   update_playback_tracks = (values) => {
      for (let i = 0; i < TOTAL_TRACKS; i++) {
         this.zoom_playback_prevs[i].classList.toggle("active", values[i]);
      }
   }
   update_vol_edit_tracks = (values) => {
      for (let i = 0; i < TOTAL_TRACKS; i++) {
         this.zoom_vol_edit_prevs[i].classList.toggle("active", values[i]);
      }
   }
   update_freq_edit_tracks = (values) => {
      for (let i = 0; i < TOTAL_TRACKS; i++) {
         this.zoom_freq_edit_prevs[i].classList.toggle("active", values[i]);
      }
   }
   update_chroma_edit_tracks = (values) => {
      for (let i = 0; i < TOTAL_TRACKS; i++) {
         this.zoom_chroma_edit_prevs[i].classList.toggle("active", values[i]);
      }
   }


   update_zoom(first, last){

      let width = 100 * (last-first+1) / TOTAL_TRACKS + "%";
      let left = 100 * (first) / TOTAL_TRACKS + "%";

      this.zoom_slider.style.width = width;
      this.zoom_slider.style.left = left;
      
   }

}
