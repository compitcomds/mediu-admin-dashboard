<template>
  <div class="bg-white p-6 rounded-xl shadow-md">
    <!-- Variants Section -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Variants</label>

      <!-- Display Each Option Set -->
      <div v-for="(option, index) in options" :key="index" class="mt-4 border border-gray-200 rounded-md p-4">
        <!-- Display View -->
        <div v-if="!option.isEditing">
          <div class="flex items-center justify-between mb-2">
            <div class="font-semibold">{{ option.name }}</div>
            <button @click="toggleEdit(index)" class="text-blue-600 hover:text-blue-800">
              Edit
            </button>
          </div>
          <div class="flex flex-wrap gap-2">
            <span v-for="(value, valIndex) in option.values" :key="valIndex" class="bg-gray-200 text-gray-800 px-3 py-1 rounded-lg text-sm">
              {{ value }}
            </span>
          </div>
        </div>

        <!-- Edit View -->
        <div v-else>
          <div class="flex flex-col">
            <label class="block text-sm font-medium text-gray-700">Option name</label>
            <input v-model="option.name" type="text" class="mt-1 block w-full border p-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Size, Color, etc." />
          </div>

          <div class="mt-4">
            <label class="block text-sm font-medium text-gray-700">Option values</label>
            <div v-for="(value, valIndex) in option.values" :key="valIndex" class="flex items-center gap-2 mb-2">
              <span class="w-4 cursor-move">≡</span>
              <input v-model="option.values[valIndex]" type="text" class="block w-full border p-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              <button @click="removeOptionValue(index, valIndex)" class="text-red-500 hover:text-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M8 6v12"/><path d="M16 6v12"/><path d="M5 10h14v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V10z"/><path d="M10 6V4h4v2"/></svg>
              </button>
            </div>

            <button @click="addOptionValue(index)" class="mt-2 text-blue-600 hover:text-blue-800">Add another value</button>
          </div>

          <div class="mt-4 flex gap-2">
            <button @click="saveOption(index)" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Done</button>
            <button @click="removeOption(index)" class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">Delete</button>
          </div>
        </div>
      </div>

      <!-- Button to Add a New Option Set -->
      <button @click="addOption" class="mt-4 bg-gray-200 text-gray-700 px-4 py-2 rounded-md flex gap-3 items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-plus">
          <circle cx="12" cy="12" r="10"/>
          <path d="M8 12h8"/>
          <path d="M12 8v8"/>
        </svg>
        <p>Add another option</p>
      </button>

      <!-- Display the list of variants -->
      <div class="mt-6">
        <table v-if="options.length > 0" class="w-full border-collapse border border-gray-200">
          <thead>
            <tr class="bg-gray-100">
              <th class="border border-gray-200 p-2">Variant</th>
              <th class="border border-gray-200 p-2">Price</th>
              <th class="border border-gray-200 p-2">Available</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(option, optionIndex) in options" :key="optionIndex">
              <td class="border border-gray-200 p-2">{{ option.name }}</td>
              <td class="border border-gray-200 p-2">₹ 0.00</td>
              <td class="border border-gray-200 p-2">0</td>
            </tr>
          </tbody>
        </table>
        <div v-if="options.length > 0" class="mt-4 text-gray-700 text-right">
          Total inventory across all locations: 0 available
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          name: 'Size',   // Default name
          values: ['44', '45', '48', '46'],  // Default values
          isEditing: false  // Control whether the option is in edit mode
        }
      ]
    };
  },
  methods: {
    // Toggle the view between display and edit mode for a specific option
    toggleEdit(index) {
      this.options[index].isEditing = !this.options[index].isEditing;
    },
    // Add a new option set
    addOption() {
      this.options.push({ name: '', values: [''], isEditing: true });
    },
    // Remove an option set
    removeOption(index) {
      this.options.splice(index, 1);
    },
    // Add a new value to a specific option set
    addOptionValue(optionIndex) {
      this.options[optionIndex].values.push(''); // Add an empty string for a new value
    },
    // Remove a specific value from an option set
    removeOptionValue(optionIndex, valueIndex) {
      this.options[optionIndex].values.splice(valueIndex, 1);
    },
    // Save the edited option set
    saveOption(index) {
      if (this.options[index].values.includes('')) {
        alert('Please enter values for all options.');
        return;
      }
      this.options[index].isEditing = false;
    }
  }
};
</script>

<style scoped>
/* Optional styles */
</style>
