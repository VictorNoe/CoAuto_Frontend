<template>
    <v-dialog v-model="localDialog" max-width="600">
      <v-card>
        <v-card-title>
          <span class="headline">Editar Auto</span>
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
                      <v-text-field v-model="vehicle.price" label="Precio" type="number" required :rules="priceRules"></v-text-field>
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
                    <v-col cols="12" v-for="(image, index) in vehicle.images" :key="index">
                          <v-file-input
                              v-model="imageFiles[index]"
                              label="Subir Imagen"
                              accept="image/*"
                              :rules="[value => !!value || 'Por favor, selecciona una imagen']"
                              @change="onImageChange(index)"
                          ></v-file-input>
  
                          <v-img :src="imagePreviews[index]" v-if="imagePreviews[index]" class="mt-2" max-height="200"></v-img>
                          <v-alert v-if="duplicateImageError[index]" type="error">Imagen duplicada</v-alert>
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

export default {
    props: {
        dialog: {
            type: Boolean,
            required: true
        },
        vehicleData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            localDialog: this.dialog,
            vehicle: { ...this.vehicleData },
            imageFiles: new Array(6).fill(null),
            step:1,
            imagePreviews: new Array(6).fill(null),
            imageSizeError: new Array(6).fill(false),
            duplicateImageError: new Array(6).fill(false)
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
      this.vehicle.description   &&    this.imagePreviews.some(preview => preview) &&
        !this.imageSizeError.includes(true) &&
        !this.duplicateImageError.includes(true)
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
            if (val) {
                this.vehicle = { ...this.vehicleData };
                this.loadImagePreviews();
            } else {
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
            this.vehicle = { ...this.vehicleData };
            this.imagePreviews = new Array(6).fill(null);
            this.imageSizeError = new Array(6).fill(false);
            this.duplicateImageError = new Array(6).fill(false);
        },
        loadImagePreviews() {
            this.vehicle.images.forEach((image, index) => {
                if (image) {
                    if (typeof image === 'string') {
                        this.imagePreviews[index] = image;
                    } else {
                        this.imagePreviews[index] = URL.createObjectURL(image);
                    }
                }
            });
        },
        onImageChange(index) {
            const imageFile = this.imageFiles[index];
            if (imageFile && imageFile.size > 2 * 1024 * 1024) {
                this.imageSizeError[index] = true;
            } else {
                this.imageSizeError[index] = false;
                this.imagePreviews[index] = URL.createObjectURL(imageFile);
                this.duplicateImageError[index] = this.checkDuplicateImages(index);
            }
        },
        checkDuplicateImages(index) {
            const imageToCheck = this.vehicle.images[index];
            return this.vehicle.images.some((image, idx) => idx !== index && image && image.name === imageToCheck.name);
        },
        async save() {
            try {
                if (!this.validForm) {
                    return;
                }
                Alerts.loading(true);

                const response = await VehiclesServices.updateCar(this.vehicle);
                console.log(response.data);
                this.$emit('car-updated',false);
                this.close();
            } catch (error) {
                console.error('Error', error);
            } finally {
                Alerts.loading(false);
            }
        }
    }
};
</script>
