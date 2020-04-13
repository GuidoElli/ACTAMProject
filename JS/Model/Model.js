class Model {
   constructor(){

      
      this._vols_base = new Array(TOTAL_TRACKS).fill(0);

      this._vols_ve_shape_amounts = new Array(TOTAL_TRACKS).fill(0);
      this._vols_ve_amounts = new Array(TOTAL_TRACKS).fill(0);

      this._vols_dadj_amounts = new Array(TOTAL_TRACKS).fill(0);


      //Layout
      this._layout = LAYOUT.VOL;

      //Selection
      this._selection_mode = SELECTION_MODE.ADD;
      this._custom_selection = false;

      //Rows
      this._playback_tracks = new Array(TOTAL_TRACKS).fill(false);
      this._vol_edit_tracks = new Array(TOTAL_TRACKS).fill(false);
      this._freq_edit_tracks = new Array(TOTAL_TRACKS).fill(false);
      this._dadj_edit_tracks = new Array(TOTAL_TRACKS).fill(false);

      this._playback_tracks_backup = null;
      this._vol_edit_tracks_backup = null;
      this._freq_edit_tracks_backup = null;
      this._dadj_edit_tracks_backup = null;
      
      //Zoom
      this._first_visible_track = 0;
      this._last_visible_track = TOTAL_TRACKS-1;


      //Vol edit

      this._ve_shape = EDITOR_SHAPE.FLAT;
      this._ve_amount = 0; // in multiplying factor or dB
      this._ve_center = 0.7; // 0 to 1
      this._ve_width = 0.4; // 0 to 1

      this._ve_random = false;
      this._ve_mirror = false;
      this._ve_random_values = new Array(TOTAL_TRACKS);
      this.randomize_ve_values();




      //Midi
      this._notes = new Array();
      this._bass_notes = new Array();

   }



   //Vol edit

   compute_vols_ve_amounts(){
      for (let i = 0; i < TOTAL_TRACKS; i++) {

         //Only shape
			switch(this._ve_shape){
				case EDITOR_SHAPE.FLAT:
					this._vols_ve_shape_amounts[i] = this._ve_amount;
					break;
				case EDITOR_SHAPE.TRIANGLE:
					if(Math.abs(i - this._ve_center*TOTAL_TRACKS) < Math.pow(this._ve_width, 2)*TOTAL_TRACKS){
						this._vols_ve_shape_amounts[i] = ( Math.pow(this._ve_width, 2)*(TOTAL_TRACKS) - Math.abs(i - this._ve_center*(TOTAL_TRACKS)) ) / (Math.pow(this._ve_width, 2)*TOTAL_TRACKS/2) * this._ve_amount / 2;
					}else{
						this._vols_ve_shape_amounts[i] = 0;
					}
					break;
				case EDITOR_SHAPE.CURVE:
					this._vols_ve_shape_amounts[i] = Math.exp( -Math.pow((i - this._ve_center*TOTAL_TRACKS)/(Math.pow(this._ve_width*0.5+0.06, 1.5)*TOTAL_TRACKS), 2)) * this._ve_amount;
					break;
         }

         //Final values (with random and mirror settings)
         if(this._vol_edit_tracks[i]){
            if(this._ve_random){
               if(this._ve_mirror){
                  this._vols_ve_amounts[i] = this._vols_ve_shape_amounts[i] * this._ve_random_values[i];
               }else{
                  this._vols_ve_amounts[i] = this._vols_ve_shape_amounts[i] * Math.abs(this._ve_random_values[i]);
               }
            }else{
               this._vols_ve_amounts[i] = this._vols_ve_shape_amounts[i];
            }
         }else{
            this._vols_ve_amounts[i] = 0;
         }
         
      }
   }





   //Vols
   get vols_base(){
      return this._vols_base;
   }
   set vols_base(values){
      this._vols_base = values;
   }
   get vols_ve_shape_amounts(){
      return this._vols_ve_shape_amounts;
   }
   set vols_ve_shape_amounts(values){
      this._vols_ve_shape_amounts = values;
   }
   get vols_ve_amounts(){
      return this._vols_ve_amounts;
   }
   set vols_ve_amounts(values){
      this._vols_ve_amounts = values;
   }
   get vols_dadj_amounts(){
      return this._vols_dadj_amounts;
   }
   set vols_dadj_amounts(values){
      this._vols_dadj_amounts = values;
   }



   


   //Layout
   get layout(){
      return this._layout;
   }
   set layout(value){
      this._layout = value;
   }

   //Selection
   get selection_mode(){
      return this._selection_mode;
   }
   set selection_mode(value){
      this._selection_mode = value;
   }

   get custom_selection(){
      return this._custom_selection;
   }
   set custom_selection(value){
      this._custom_selection = value;
   }



   //Rows

   get playback_tracks(){
      return this._playback_tracks;
   }
   get vol_edit_tracks(){
      return this._vol_edit_tracks;
   }
   get freq_edit_tracks(){
      return this._freq_edit_tracks;
   }
   get dadj_edit_tracks(){
      return this._dadj_edit_tracks;
   }

   get playback_tracks_backup(){
      return this._playback_tracks_backup;
   }
   get vol_edit_tracks_backup(){
      return this._vol_edit_tracks_backup;
   }
   get freq_edit_tracks_backup(){
      return this._freq_edit_tracks_backup;
   }
   get dadj_edit_tracks_backup(){
      return this._dadj_edit_tracks_backup;
   }

   set_playback_track = (track, value) => {
      this._playback_tracks[track] = value;
   }
   set_vol_edit_track = (track, value) => {
      this._vol_edit_tracks[track] = value;
      this.compute_vols_ve_amounts();
   }
   set_freq_edit_track = (track, value) => {
      this._freq_edit_tracks[track] = value;
   }
   set_dadj_edit_track = (track, value) => {
      this._dadj_edit_tracks[track] = value;
   }

   backup_playback_tracks = () => {
      this._playback_tracks_backup = this._playback_tracks.slice();
   }
   backup_vol_edit_tracks = () => {
      this._vol_edit_tracks_backup = this._vol_edit_tracks.slice();
   }
   backup_freq_edit_tracks = () => {
      this._freq_edit_tracks_backup = this._freq_edit_tracks.slice();
   }
   backup_dadj_edit_tracks = () => {
      this._dadj_edit_tracks_backup = this._dadj_edit_tracks.slice();
   }



   //Zoom
   get first_visible_track(){
      return this._first_visible_track;
   }
   set first_visible_track(value){
      this._first_visible_track = value;
   }

   get last_visible_track(){
      return this._last_visible_track;
   }
   set last_visible_track(value){
      this._last_visible_track = value;
   }


   //Vol edit
   get ve_shape(){
      return this._ve_shape;
   }
   set ve_shape(value){
      this._ve_shape = value;
      this.compute_vols_ve_amounts();
   }

   get ve_amount(){
      return this._ve_amount;
   }
   set ve_amount(value){
      this._ve_amount = value;
      this.compute_vols_ve_amounts();
   }

   get ve_center(){
      return this._ve_center;
   }
   set ve_center(value){
      this._ve_center = value;
      this.compute_vols_ve_amounts();
   }

   get ve_width(){
      return this._ve_width;
   }
   set ve_width(value){
      this._ve_width = value;
      this.compute_vols_ve_amounts();
   }

   get ve_random(){
      return this._ve_random;
   }
   set ve_random(value){
      this._ve_random = value;
      this.compute_vols_ve_amounts();
   }

   get ve_mirror(){
      return this._ve_mirror;
   }
   set ve_mirror(value){
      this._ve_mirror = value;
      this.compute_vols_ve_amounts();
   }

   randomize_ve_values = () => {
      for(let i = 0; i < TOTAL_TRACKS; i++){
         this._ve_random_values[i] = Math.random() * 2 - 1;
      }
      this.compute_vols_ve_amounts();
   }


   get notes(){
      return this._notes;
   }
   set notes(value){
      this._notes = value;
   }

   get bass_notes(){
      return this._bass_notes;
   }
   set bass_notes(value){
      this._bass_notes = value;
   }
}
