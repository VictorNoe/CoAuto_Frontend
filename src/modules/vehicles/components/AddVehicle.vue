
<template>
  <v-dialog v-model="localDialog" max-width="600">
    <v-card>
      <v-card-title>
        <span class="headline">Agregar Auto</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="vehicle.model" label="Modelo" required :rules="modelRules"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="vehicle.brand" label="Marca" required :rules="brandRules"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="vehicle.year" label="Año" type="number" required :rules="yearRules"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="vehicle.price" label="Precio" type="number" required :rules="priceRules"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="vehicle.type" label="Tipo" required :rules="typeRules"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="vehicle.fuel" label="Combustible" required :rules="fuelRules"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="vehicle.doors" label="Puertas" type="number" required :rules="doorsRules"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="vehicle.engine" label="Motor" required :rules="engineRules"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="vehicle.height" label="Altura" type="number" required :rules="heightRules"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="vehicle.width" label="Ancho" type="number" required :rules="widthRules"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field v-model="vehicle.length" label="Longitud" type="number" required :rules="lengthRules"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea v-model="vehicle.description" label="Descripción" required :rules="descriptionRules"></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-row>
                <v-col v-for="(image, index) in images" :key="index" cols="12">
                  <v-card>
                    <v-img v-if="imagePreviews[index]" :src="imagePreviews[index]" height="150" contain class="mb-3"></v-img>
                    <input type="file" @change="handleFileUpload($event, index)" accept="image/*" style="display: none" ref="imageInput">
                    <v-btn color="blue" dark @click="$refs.imageInput[index].click()" v-if="!imagePreviews[index]">Subir Imagen</v-btn>
                    <v-alert v-if="imageSizeError[index]" type="error">La imagen no debe pesar mas de 5MB</v-alert>
                    <v-alert v-if="duplicateImageError[index]" type="error">Esta imagen ya ha sido seleccionada, selecciona otra</v-alert>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
        <v-btn color="blue darken-1" text @click="save" :disabled="!validForm">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Alerts from '../../../utils/Alert';
import VehiclesServices from '../VehiclesServices';

export default {
  props: {
    dialog: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      localDialog: this.dialog,
      vehicle: {
        model: '',
        brand: '',
        year: null,
        price: null,
        type: '',
        fuel: '',
        doors: null,
        engine: '',
        height: null,
        width: null,
        length: null,
        description: '',
        image_urls: []
      },
      images: new Array(6).fill(null),
      imagePreviews: [],
      imageSizeError: new Array(6).fill(false),
      duplicateImageError: new Array(6).fill(false)
    };
  },
  computed: {
    validForm() {
      return (
        this.modelRules.length === 0 &&
        this.brandRules.length === 0 &&
        this.yearRules.length === 0 &&
        this.priceRules.length === 0 &&
        this.typeRules.length === 0 &&
        this.fuelRules.length === 0 &&
        this.doorsRules.length === 0 &&
        this.engineRules.length === 0 &&
        this.heightRules.length === 0 &&
        this.widthRules.length === 0 &&
        this.lengthRules.length === 0 &&
        this.descriptionRules.length === 0 &&
        this.images.every((image, index) => !this.imageSizeError[index] && !this.duplicateImageError[index])
      );
    },
    modelRules() {
      return [
        value => !!value || 'El modelo es requerido',
        value => /^[a-zA-Z0-9\s]+$/.test(value) || 'El modelo no debe contener caracteres especiales'
      ];
    },
    brandRules() {
      return [
        value => !!value || 'La marca es requerida',
        value => /^[a-zA-Z0-9\s]+$/.test(value) || 'La marca no debe contener caracteres especiales'
      ];
    },
    yearRules() {
      return [
        value => !!value || 'El año es requerido',
        value => /^\d{4}$/.test(value) || 'El año debe ser un número de 4 dígitos'
      ];
    },
    priceRules() {
      return [
        value => !!value || 'El precio es requerido',
        value => /^\d+(\.\d{1,2})?$/.test(value) || 'El precio debe ser un número válido'
      ];
    },
    typeRules() {
      return [
        value => !!value || 'El tipo es requerido',
        value => /^[a-zA-Z0-9\s]+$/.test(value) || 'El tipo no debe contener caracteres especiales'
      ];
    },
    fuelRules() {
      return [
        value => !!value || 'El combustible es requerido',
        value => /^[a-zA-Z0-9\s]+$/.test(value) || 'El combustible no debe contener caracteres especiales'
      ];
    },
    doorsRules() {
      return [
        value => !!value || 'El número de puertas es requerido',
        value => /^\d+$/.test(value) || 'El número de puertas debe ser un número'
      ];
    },
    engineRules() {
      return [
        value => !!value || 'El motor es requerido',
        value => /^[a-zA-Z0-9\s]+$/.test(value) || 'El motor no debe contener caracteres especiales'
      ];
    },
    heightRules() {
      return [
        value => !!value || 'La altura es requerida',
        value => /^\d+(\.\d{1,2})?$/.test(value) || 'La altura debe ser un número válido'
      ];
    },
    widthRules() {
      return [
        value => !!value || 'El ancho es requerido',
        value => /^\d+(\.\d{1,2})?$/.test(value) || 'El ancho debe ser un número válido'
      ];
    },
    lengthRules() {
      return [
        value => !!value || 'La longitud es requerida',
        value => /^\d+(\.\d{1,2})?$/.test(value) || 'La longitud debe ser un número válido'
      ];
    },
    descriptionRules() {
      return [
        value => !!value || 'La descripción es requerida',
        value => /^[a-zA-Z0-9\s]+$/.test(value) || 'La descripción no debe contener caracteres especiales'
      ];
    }
  },
  watch: {
    dialog(val) {
      this.localDialog = val;
      if (!val) {
        this.resetForm();
      }
    }
  },
  methods: {
    close() {
      this.localDialog = false;
      this.resetForm();
    },
    resetForm() {
      this.vehicle = {
        model: '',
        brand: '',
        year: null,
        price: null,
        type: '',
        fuel: '',
        doors: null,
        engine: '',
        height: null,
        width: null,
        length: null,
        description: '',
        image_urls: []
      };
      this.images = new Array(6).fill(null);
      this.imagePreviews = [];
      this.imageSizeError = new Array(6).fill(false);
      this.duplicateImageError = new Array(6).fill(false);
    },
    async save() {
      try {
        if (!this.validForm) {
          return;
        }
        Alerts.loading(true);
        const uploadedUrls = await this.uploadImages();
        this.vehicle.image_urls = uploadedUrls;

        const response = await VehiclesServices.addCar(this.vehicle);
        console.log(response.data);
        this.close();
      } catch (error) {
        console.error('Error', error);
      } finally {
        Alerts.loading(false);
      }
    },
    async uploadImages() {
      const uploadedUrls = [];
      const uploadedImages = new Set();
      for (let i = 0; i < this.images.length; i++) {
        const image = this.images[i];
        if (image && !this.imageSizeError[i] && !this.duplicateImageError[i]) {
          const formData = new FormData();
          formData.append('upload_preset', 'buffet');
          formData.append('file', image);
          formData.append('api_key', '578366943965652');
          formData.append('folder', 'packages');

          const response = await fetch('https://api.cloudinary.com/v1_1/iotimages/upload', {
            method: 'POST',
            body: formData
          });

          if (!response.ok) {
            throw new Error('Error al subir imagen a Cloudinary');
          }

          const responseData = await response.json();
          if (!uploadedImages.has(responseData.secure_url)) {
            uploadedUrls.push(responseData.secure_url);
            uploadedImages.add(responseData.secure_url);
          }
        }
      }

      return uploadedUrls;
    },
    handleFileUpload(event, index) {
      const file = event.target.files[0];
      if (file && index >= 0 && index < 6) {
        // Validar tamaño de imagen
        if (file.size > 5242880) { // 5MB in bytes
          this.$set(this.imageSizeError, index, true);
          this.$refs.imageInput[index].value = ''; // Limpiar el valor del input file
          return;
        } else {
          this.$set(this.imageSizeError, index, false);
        }

        // Validar duplicados
        const selectedImages = this.images.filter((img, idx) => idx !== index && img);
        if (selectedImages.some(img => img.name === file.name)) {
          this.$set(this.duplicateImageError, index, true);
          this.$refs.imageInput[index].value = ''; // Limpiar el valor del input file
          return;
        } else {
          this.$set(this.duplicateImageError, index, false);
        }

        // Actualizar imagen y previsualización
        this.$set(this.images, index, file);
        const reader = new FileReader();
        reader.onload = (e) => {
          this.$set(this.imagePreviews, index, e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }
};
</script>

<style scoped>
.v-card {
  margin-bottom: 15px;
}
</style>
