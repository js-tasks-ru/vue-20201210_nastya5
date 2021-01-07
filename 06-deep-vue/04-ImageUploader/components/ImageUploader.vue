<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': bLoading }"
      :style="imageId ? `--bg-image: url('${getImageURL}')` : ''"
      @click="handleReset"
    >
      <span v-if="imageId !== null">Удалить изображение</span>
      <span v-else-if="bLoading">Загрузка...</span>
      <span v-else>Загрузить изображение</span>

      <input
        type="file"
        accept="image/*"
        class="form-control-file"
        :disabled="this.bLoading || this.imageId !== null"
        :value="filePath"
        @change="handleBrowseFile($event.target.value)"
      />
    </label>
  </div>
</template>

<script>
import { ImageService } from '../image-service';

export default {
  name: 'ImageUploader',
  props: {
    imageId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      bLoading: false,
      filePath: undefined,
    };
  },
  model: {
    prop: 'imageId',
    event: 'change',
  },
  methods: {
     handleBrowseFile(value) {
      this.filePath = value;
      this.bLoading = true;

      ImageService.uploadImage(value).then((res) => {
        this.$emit(`change`, res.id);
        this.bLoading = false;
      });
    },
    handleReset() {
      if (this.imageId !== null) {
        this.$emit(`change`, null);
        this.filePath = undefined;
      }
    },
  },
  computed: {
    getImageURL() {
      return ImageService.getImageURL(this.imageId);
    },
  },
};
</script>

<style scoped>
.image-uploader .form-control-file {
  opacity: 0;
  height: 0;
}

.image-uploader .image-uploader__preview {
  --bg-image: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)
    ),
    var(--bg-image);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader .image-uploader__preview > span {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader .image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader .image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
