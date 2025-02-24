import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from './product.model';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent implements OnInit {
  product: Product = {
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    images: [],
    type: '',
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
    }
  };
  selectedFile: File | null = null; // ใช้สำหรับเก็บไฟล์ที่เลือก

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    // ดึง ID ของสินค้าจาก route parameters
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe((data) => {
        this.product = data; // รับข้อมูลสินค้าที่จะทำการแก้ไข
        console.log(this.product.details);
        
      });
    }
  }

  // ฟังก์ชันสำหรับการเลือกไฟล์ภาพ
  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];
      this.uploadImage(this.selectedFile);
    }
  }

  // ฟังก์ชันสำหรับอัปโหลดและแปลงไฟล์ภาพ
  uploadImage(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        this.product.images.push(e.target.result as string); // เพิ่มรูปภาพไปยังอาเรย์
      }
    };
    reader.readAsDataURL(file);
  }

  // ฟังก์ชันสำหรับการลบรูปภาพ
  removeImage(index: number): void {
    this.product.images.splice(index, 1); // ลบรูปภาพออกจากอาเรย์
  }

  // ฟังก์ชันสำหรับอัปเดตสินค้า
  updateProduct() {
    this.productService.updateProduct(this.product).subscribe(() => {
      this.router.navigate(['/']); // นำทางกลับไปที่หน้าแสดงรายการสินค้า
      console.log(this.product);
    });
  }


  // Add brigthness
  addBrightness() {
    if (!this.product.details.brightness) {
      this.product.details.brightness = ['']; // ตรวจสอบว่ามี array อยู่แล้วหรือยัง
    }
    this.product.details.brightness.push(''); // เพิ่มช่องว่างใหม่ลงใน array
  }
  // ADD Adaptive Sync
  addAdaptiveSync() {
    if (!this.product.details.adaptiveSync) {
      this.product.details.adaptiveSync = [''];
    }
    this.product.details.adaptiveSync.push('');
  }
  // Add Connectivity
  addConnectivity() {
    if (!this.product.details.connectivity) {
      this.product.details.connectivity = [''];
    }
    this.product.details.connectivity.push('');
  }
  // Add Power Consumption
  addPowerConsumption() {
    if (!this.product.details.powerConsumption) {
      this.product.details.powerConsumption = [''];
    }
    this.product.details.powerConsumption.push('');
  }
  // Add Mechanical
  addMechanical() {
    if (!this.product.details.mechanical) {
      this.product.details.mechanical = [''];
    }
    this.product.details.mechanical.push('');
  }
  // Add Weight
  addWeight(){
    if (!this.product.details.weight) {
      this.product.details.weight = [''];
    }
    this.product.details.weight.push('');
  }
  // Add Expansion Slots
  addExpansionSlots() {
    if (!this.product.details.expansionSlots) {
      this.product.details.expansionSlots = ['']
    }
    this.product.details.expansionSlots.push('');
  }
  // Add storage
  addStorage() {
    if (!this.product.details.storage) {
      this.product.details.storage = ['']
    }
    this.product.details.storage.push('');
  }
  // Add Rear Panel
  addRearPanel() {
    if (!this.product.details.rearPanel) {
      this.product.details.rearPanel = ['']
    }
    this.product.details.rearPanel.push('');
  }
  // Add CPU Socket Cooler 
  addCpuSocketCooler() {
    if (!this.product.details.cpuSocketCooler) {
      this.product.details.cpuSocketCooler = ['']
    }
    this.product.details.cpuSocketCooler.push('');
  }
  // Add PCIE Connector
  addPcieConnector() {
    if (!this.product.details.pcieConnector) {
      this.product.details.pcieConnector = ['']
    }
    this.product.details.pcieConnector.push('');
  }
  // ADD Mainboard Support
  addMainboardSupport() {
    if (!this.product.details.mainboardSupport) {
      this.product.details.mainboardSupport = ['']
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
}
