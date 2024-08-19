<template>
  <v-dialog v-model="localDialog" max-width="600" @click:outside="close">
    <v-card>
      <v-card-title>
        <span class="headline">Agregar Auto</span>
      </v-card-title>
      <v-card-text>
        <v-stepper v-model="step">
          <v-stepper-header>
            <v-stepper-step :complete="step > 1" step="1">General</v-stepper-step>
            <v-stepper-step :complete="step > 2" step="2">Detalles</v-stepper-step>
            <v-stepper-step step="3">Imágenes</v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <!-- Step 1: General -->
            <v-stepper-content step="1">
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
                </v-row>
              </v-container>
              <v-card-actions>
                <v-btn color="blue darken-1" text @click="step = 2">Siguiente</v-btn>
              </v-card-actions>
            </v-stepper-content>

            <!-- Step 2: Detalles -->
            <v-stepper-content step="2">
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="vehicle.price" label="Precio" type="number" required :rules="priceRules"
                ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="vehicle.type" label="Tipo" required :rules="typeRules"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="vehicle.fuel" label="Combustible" required :rules="fuelRules"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="vehicle.doors" label="Número de puertas" type="number" required :rules="doorsRules"></v-text-field>
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
                </v-row>
              </v-container>
              <v-card-actions>
                <v-btn color="blue darken-1" text @click="step = 1">Atrás</v-btn>
                <v-btn color="blue darken-1" text @click="step = 3">Siguiente</v-btn>
              </v-card-actions>
            </v-stepper-content>

            <!-- Step 3: Imágenes -->
            <v-stepper-content step="3">
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-card>
                      <v-img v-if="imagePreviews.length" :src="imagePreviews[0]" height="150" contain class="mb-3"></v-img>
                      <input type="file" @change="handleFileUpload($event)" accept="image/*" style="display: none" ref="imageInput" multiple>
                      <v-btn color="blue" dark @click="$refs.imageInput.click()">Subir Imágenes</v-btn>
                      <v-alert v-if="imageSizeError" type="error">Una o más imágenes no deben pesar más de 5MB</v-alert>
                      <v-alert v-if="duplicateImageError" type="error">Una o más imágenes ya han sido seleccionadas, selecciona otras</v-alert>
                      <v-alert v-if="imageCountError" type="error">Solo se permiten hasta 6 imágenes</v-alert>
                    </v-card>
                    <v-row v-if="imagePreviews.length" class="mt-3">
                      <v-col v-for="(image, index) in imagePreviews" :key="index" cols="6" sm="4" md="3">
                        <v-img :src="image" height="100" contain></v-img>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-container>
              <v-card-actions>
                <v-btn color="blue darken-1" text @click="step = 2">Atrás</v-btn>
                <v-btn color="blue darken-1" text @click="save" :disabled="!validForm">Guardar</v-btn>
              </v-card-actions>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Alerts from '../../../utils/Alert';
import VehiclesServices from '../VehiclesServices';
import Aws from '../../../utils/aws-configure';
export default {
  props: {
    dialog: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      step: 1,
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
      imageSizeError: false,
      duplicateImageError: false,
      imageCountError: false,
      formattedPrice:''

    };
  },
  computed: {
    validForm() {
      return (
        this.vehicle.model &&
        this.vehicle.brand &&
        this.vehicle.year &&
        this.vehicle.price &&
        this.vehicle.type &&
        this.vehicle.fuel &&
        this.vehicle.doors &&
        this.vehicle.engine &&
        this.vehicle.height &&
        this.vehicle.width &&
        this.vehicle.length &&
        this.vehicle.description && 
        this.imagePreviews.length &&
        !this.imageSizeError &&
        !this.duplicateImageError &&
        !this.imageCountError

      );
    },
    modelRules() {
      return [
        value => !!value || 'El modelo es requerido',
        value => /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ.,]+$/.test(value) || 'El modelo no debe contener caracteres especiales'
      ];
    },
    brandRules() {
      return [
        value => !!value || 'La marca es requerida',
        value => /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ]+$/.test(value) || 'La marca no debe contener caracteres especiales'
      ];
    },
    yearRules() {
      return [
        value => !!value || 'El año es requerido',
        value => /^\d{4}$/.test(value) || 'El año debe ser un número de 4 dígitos',
        value => value >= 1980 || 'El año no debe ser menor a 1980',
        value => value <= new Date().getFullYear() || 'El año no debe ser mayor al año actual'
      ];
    },
    priceRules() {
      return [
        value => !!value || 'El precio es requerido',
        value => /^\d+(\.\d{1,2})?$/.test(value.replace(/,/g, '')) || 'El precio debe ser un número válido',
        value => parseFloat(value.replace(/,/g, '')) <= 3000000 || 'El precio no debe ser mayor a 3 millones'
      ];
    },
    typeRules() {
      return [
        value => !!value || 'El tipo es requerido',
        value => /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ.,]+$/.test(value) || 'El tipo no debe contener caracteres especiales'
      ];
    },
    fuelRules() {
      return [
        value => !!value || 'El combustible es requerido',
        value => /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ.,]+$/.test(value) || 'El combustible no debe contener caracteres especiales'
      ];
    },
    doorsRules() {
      return [
        value => !!value || 'El número de puertas es requerido',
        value => /^\d+$/.test(value) || 'El número de puertas debe ser un número',
        value => value >= 2 && value <=5 || 'El número de puertas debe ser un numero entre 2 a 5'
      ];
    },
    engineRules() {
      return [
        value => !!value || 'El motor es requerido',
        value => /^[a-zA-Z0-9\s.,]+$/.test(value) || 'El motor no debe contener caracteres especiales'
      ];
    },
    heightRules() {
      return [
        value => !!value || 'La altura es requerida',
        value => /^\d+(\.\d{1,2})?$/.test(value) || 'La altura debe ser un número válido',
        value => value.length <= 2 || 'La altura no debe exceder 2 dígitos'
      ];
    },
    widthRules() {
      return [
        value => !!value || 'El ancho es requerido',
        value => /^\d+(\.\d{1,2})?$/.test(value) || 'El ancho debe ser un número válido',
        value => value.length <= 2 || 'El ancho no debe exceder 2 dígitos'
      ];
    },
    lengthRules() {
      return [
        value => !!value || 'La longitud es requerida',
        value => /^\d+(\.\d{1,2})?$/.test(value) || 'La longitud debe ser un número válido',
        value => value.length <= 2 || 'La longitud no debe exceder 2 dígitos'
      ];
    },
    descriptionRules() {
      return [
        value => !!value || 'La descripción es requerida',
        value => /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ.,]+$/.test(value) || 'La descripción no debe contener caracteres especiales',
        value => value.length <= 100 || 'La descripción no debe exceder 100 caracteres'
      ];
    }
  },
  watch: {
    dialog(val) {
      this.localDialog = val;
      if (!val) {
        this.resetForm();
      }
    },
    
  },
  methods: {
    formatPrice() {
      const plainNumber = this.formattedPrice.replace(/,/g, '');
      this.formattedPrice = parseFloat(plainNumber).toLocaleString('en');
      this.vehicle.price = parseFloat(plainNumber);
      console.log(this.formattedPrice);
      
    },
    close() {
      this.resetForm();
      this.localDialog = false;
      if (!this.localDialog) {
        this.$emit('close-dialog', false);
      }
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
      this.images = [];
      this.imagePreviews = [];
      this.imageSizeError = false;
      this.duplicateImageError = false;
      this.imageCountError = false;
      this.formattedPrice='';
    },
    handleFileUpload(event) {
      const files = event.target.files;
      const maxFileSize = 5 * 1024 * 1024; // 5MB
      const maxImages = 6;
      let newImages = [];
      let newImagePreviews = [];
      let hasDuplicate = false;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        if (file.size > maxFileSize) {
          this.imageSizeError = true;
          continue;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          const src = e.target.result;

          if (this.imagePreviews.includes(src)) {
            hasDuplicate = true;
            return;
          }

          newImages.push(file);
          newImagePreviews.push(src);

          if (newImagePreviews.length > maxImages) {
            this.imageCountError = true;
            return;
          }

          this.imageSizeError = false;
          this.duplicateImageError = hasDuplicate;
          this.imageCountError = false;

          this.images = [...this.images, ...newImages];
          this.imagePreviews = [...this.imagePreviews, ...newImagePreviews];
        };
        reader.readAsDataURL(file);
      }
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
        if (response.statusCode == 200) {
          this.$emit("car-added", false)
          this.close();
        }
      } catch (error) {
        console.error('Error', error);
      } finally {
        Alerts.loading(false);
      }
    },
    async uploadImages() {
      const uploadedUrls = [];
      for (let i = 0; i < this.images.length; i++) {
        const image = this.images[i];
        if (image && !this.imageSizeError[i] && !this.duplicateImageError[i]) {
          const params = {
            Bucket: process.env.VUE_APP_S3_BUCKET_NAME,
            Key: `vehicles/${Date.now()}_${image.name}`,
            Body: image,
            ContentType: image.type
          };

          try {
            const data = await Aws.s3.upload(params).promise();
            uploadedUrls.push(data.Location);
          } catch (err) {
            console.error('Error al subir la imagen', err);
            throw new Error("No se pudieron cargar las imagenes");

          }
        }
      }
      return uploadedUrls;
    },
  }
};
</script>
