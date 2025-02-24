import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css',
})
export class CreateProductComponent {
  name: string = '';
  description: string = '';
  price: number | null = null;
  quantity: number | null = null;
  images: File[] = [];
  imagePreviews: string[] = []; // สำหรับเก็บภาพที่จะแสดงตัวอย่าง
  selectedType: string = '';
  specailProduct: boolean = false;
  product: any = {
    details: {
      brands: '',
      warranty: '',
      dimension: '',

      series: '',
      processorNumber: '',
      socketType: '',
      coresThreads: '',
      baseFrequency: '',
      maxTurboFrequency: '',
      l2Cache: '',
      l3Cache: '',
      graphicsModels: '',
      bitSupport: '',
      cpuCooler: '',
      maximumTurboPower: '',

      displaySize: '',
      panelSize: '',
      resolution: '',
      resolutionType: '',
      displayColor: '',
      displayViewingArea: '',
      brightness: [''], // Initialized with an empty string for the first input
      contrastRatio: '',
      responseTime: '',
      aspectRatio: '',
      refreshRate: '',
      screenCurvature: '',
      pixelPitch: '',
      viewingAngle: '',
      colorGamut: '',
      hdrSupport: '',
      adaptiveSync: [''], // Initialized similarly
      displaySurface: '',
      flickerFree: '',
      lowBlueLight: '',
      connectivity: [''], // Initialized similarly
      signalFrequency: '',
      powerConsumption: [''], // Initialized similarly
      mechanical: [''],
      weight: [''],
      color: '',

      cpuSupport: '',
      cpuSocket: '',
      memorySlots: '',
      memoryType: '',
      maxMemmory: '',
      onboardGraphics: '',
      onboardAudioShipset: '',
      expansionSlots: [''],
      storage: [''],
      rearPanel: [''],
      lanChipset: '',
      lanSpeed: '',
      dimensions: '',
      powerPin: '',
      formFactor: '',
      chipset: '',
      audioChanels: '',

      gpuSeries: '',
      gpuModel: '',
      memorySize: '',
      busStandard: '',
      cudaCore: '',
      memoryInterface: '',
      boostClock: '',
      baseClock: '',
      memoryClock: '',
      maxDigitalResolution: '',
      hdmiPort: '',
      displayPort: '',
      coolerFan: '',
      powerConector: '',
      powerRequirement: '',

      memorySeries: '',
      memoryCapacity: '',
      casLatency: '',
      testedlatency: '',
      sdpVoltage: '',
      memoryColor: '',

      capacity: '',
      interface: '',
      readSpeed: '',
      writeSpeed: '',

      coolerModel: '',
      exteriorColor: '',
      cpuSocketCooler: [''],
      radiatorDimension: '',
      readiatorMeterail: '',
      radiatorSize: '',
      thermalDesignPower: '',
      pumpSpeed: '',
      fanDimensions: '',
      fanLedType: '',
      fanSpeed: '',
      fanAirflow: '',
      fanNoise: '',
      fanConnector: '',
      coolerWeight: '',
      coolerType: '',

      tiltScrollFunction: '',
      clickLifeSpan: '',
      scrollWhell: '',
      nummerOfButtons: '',
      batterryLife: '',
      batterryType: '',
      mouseInterface: '',
      sensorResolution: '',
      sensorTechnology: '',
      wirelessTechnology: '',

      switchName: '',
      keyboardConnectivity: '',
      lighting: '',
      localization: '',
      materail: '',
      wirelessFrequency: '',
      batteryTypeAndQuantity: '',
      keyboardWeight: '',
      usbPort: '',
      type: '',
      wiredOrWireless: '',

      connector: '',
      driverUnit: '',
      frequencyResponse: '',
      sensitivity: '',
      inputImpedance: '',
      micFrequencyResponse: '',
      micSensitivity: '',
      micImpedance: '',
      cordLenght: '',

      energyEfficient: '',
      modular: '',
      continuousPowerW: '',
      psuFormFactor: '',
      mbConnector: '',
      cpuConnector: '',
      pcieConnector: [''],
      sataConnector: '',
      fanSize: '',
      psuWeight: '',
      protection: '',
      powerRage: '',

      model: '',
      mainboardSupport: [''],
      vgaSupport: '',
      cpuCoolerSupport: '',
      powerSupplySupport: '',
      frontIO: '',
      caseExpansionSlots: '',
      driveBaysSupport: '',
      fanInstallment: '',
      fanSupportFront: '',
      fanSupportTop: '',
      fanSupportSide: '',
      fanSupportRear: '',
      fanSupportBottom: '',
      maxRadiatorSupport: '',
      radidatorSupportFront: '',
      radiatorSupportTop: '',
      radiatoSupportSide: '',
      radiatorSupportRear: '',
      radiatorSupportBottom: '',
      accessories: '',
      caseWeight: '',
    },
  };

  constructor(private http: HttpClient) {}

  // ฟังก์ชันเมื่อมีการเปลี่ยนแปลงไฟล์ที่เลือก
  onFileChange(event: any) {
    this.images = Array.from(event.target.files); // เก็บไฟล์ที่เลือกไว้ใน array
    this.imagePreviews = []; // เคลียร์ตัวอย่างภาพก่อนหน้า

    // สร้างตัวอย่างภาพใหม่
    for (let file of this.images) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviews.push(e.target.result); // เก็บ base64 ของภาพเพื่อแสดงตัวอย่าง
      };
      reader.readAsDataURL(file); // แปลงไฟล์ภาพเป็น base64
    }
  }

  // ฟังก์ชันสร้างสินค้า
  async createProduct() {
    const imageBase64Promises = this.images.map((file) =>
      this.convertToBase64(file)
    );
    const imageBase64 = await Promise.all(imageBase64Promises);

    const productData = {
      // ...this.product,
      name: this.name,
      description: this.description,
      price: this.price,
      quantity: this.quantity,
      images: imageBase64, // ส่งภาพแบบ base64 ไปยัง backend
      specailProduct: this.specailProduct,
      type: this.selectedType,
      details: this.product.details,
    };

    this.http.post('http://localhost:3000/products', productData).subscribe(
      (response) => {
        console.log('Success:', response);
        alert('Product created successfully!');
      },
      (error) => {
        console.error('Error:', error);
        alert('Error creating product');
      }
    );
  }

  // ฟังก์ชันแปลงไฟล์เป็น Base64
  private convertToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => resolve(reader.result as string);
    });
  }

  // Add brigthness
  addBrightness() {
    if (!this.product.details.brightness) {
      this.product.details.brightness = []; // ตรวจสอบว่ามี array อยู่แล้วหรือยัง
    }
    this.product.details.brightness.push(''); // เพิ่มช่องว่างใหม่ลงใน array
  }
  // ADD Adaptive Sync
  addAdaptiveSync() {
    if (!this.product.details.adaptiveSync) {
      this.product.details.adaptiveSync = [];
    }
    this.product.details.adaptiveSync.push('');
  }
  // Add Connectivity
  addConnectivity() {
    if (!this.product.details.connectivity) {
      this.product.details.connectivity = [];
    }
    this.product.details.connectivity.push('');
  }
  // Add Power Consumption
  addPowerConsumption() {
    if (!this.product.details.powerConsumption) {
      this.product.details.powerConsumption = [];
    }
    this.product.details.powerConsumption.push('');
  }
  // Add Mechanical
  addMechanical() {
    if (!this.product.details.mechanical) {
      this.product.details.mechanical = [];
    }
    this.product.details.mechanical.push('');
  }
  // Add Weight
  addWeight() {
    if (!this.product.details.weight) {
      this.product.details.weight = [];
    }
    this.product.details.weight.push('');
  }
  // Add Expansion Slots
  addExpansionSlots() {
    if (!this.product.details.expansionSlots) {
      this.product.details.expansionSlots = [];
    }
    this.product.details.expansionSlots.push('');
  }
  // Add storage
  addStorage() {
    if (!this.product.details.storage) {
      this.product.details.storage = [];
    }
    this.product.details.storage.push('');
  }
  // Add Rear Panel
  addRearPanel() {
    if (!this.product.details.rearPanel) {
      this.product.details.rearPanel = [];
    }
    this.product.details.rearPanel.push('');
  }
  // Add CPU Socket Cooler
  addCpuSocketCooler() {
    if (!this.product.details.cpuSocketCooler) {
      this.product.details.cpuSocketCooler = [];
    }
    this.product.details.cpuSocketCooler.push('');
  }
  // Add PCIE Connector
  addPcieConnector() {
    if (!this.product.details.pcieConnector) {
      this.product.details.pcieConnector = [];
    }
    this.product.details.pcieConnector.push('');
  }
  // ADD Mainboard Support
  addMainboardSupport() {
    if (!this.product.details.mainboardSupport) {
      this.product.details.mainboardSupport = [];
    }
    this.product.details.mainboardSupport.push('');
  }

  // Remove Brightnes
  removeBrightness(index: number) {
    this.product.details.brightness.splice(index, 1); // ลบรายการที่ระบุจาก array
  }
  // Remove Adaptive
  removeAdaptiveSync(index: number) {
    this.product.details.adaptiveSync.splice(index, 1);
  }
  // Remove Connectivity
  removeConnectivity(index: number) {
    this.product.details.connectivity.splice(index, 1);
  }
  // Remove Power Consumption
  removePowerConsumption(index: number) {
    this.product.details.powerConsumption.splice(index, 1);
  }
  // remove Mechanical
  removeMechanical(index: number) {
    this.product.details.mechanical.splice(index, 1);
  }
  // remove Weight
  removeWeight(index: number) {
    this.product.details.weight.splice(index, 1);
  }
  // Remove Expansion Slots
  removeExpansionSlots(index: number) {
    this.product.details.expansionSlots.splice(index, 1);
  }
  // Remove Storage
  removeStorage(index: number) {
    this.product.details.storage.splice(index, 1);
  }
  // Remove Rear Panel
  removeRearPanel(index: number) {
    this.product.details.rearPanel.splice(index, 1);
  }
  // Remove Cpu Socket Cooler
  removeCpuSocketCooler(index: number) {
    this.product.details.cpuSocketCooler.splice(index, 1);
  }
  // Remove PCIE Connector
  removePcieConnector(index: number) {
    this.product.details.pcieConnector.splice(index, 1);
  }
  // Remove Mainboar dSupport
  removeMainboardSupport(index: number) {
    this.product.details.mainboardSupport.splice(index, 1);
  }

  addArrTest() {
    if (!this.product.details.testArr01) {
      this.product.details.testArr01 = [];
    }
    this.product.details.testArr01.push('');
  }

  remoceAddArrTest(index: number) {
    this.product.details.testArr01.splice(index, 1);
  }

  onTypeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedType = select.value;
    // Reset details when type changes
    this.product.details = {};
  }

  onSpecailProdcutChange(event: Event) {
    const spProcut = event.target as HTMLSelectElement;
    const selectedValue = spProcut.value === 'true'; // แปลงค่าเป็น Boolean (true/false)
    console.log(selectedValue);
    this.specailProduct = selectedValue;
  }
}
