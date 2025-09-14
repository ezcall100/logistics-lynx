/**
 * DataBot - Test Data Manager Agent
 * Creates mock data for tables & APIs
 * Part of MCP A-Z Testing Agent Framework
 */

const { MCPAgent } = require('../base/mcp-agent-base');

class DataBot extends MCPAgent {
  constructor() {
    super({
      name: 'DataBot',
      role: 'Test Data Manager',
      id: 3,
      group: 'A',
      description: 'Creates mock data for tables & APIs',
      port: 3001,
      endpoints: ['/mcp/testing/data', '/mcp/testing/mock'],
      capabilities: [
        'Mock data generation',
        'API test data creation',
        'Table data population',
        'Realistic test scenarios'
      ]
    });
  }

  async generateMockData(type, count = 1, options = {}) {
    try {
      const mockData = {
        type,
        count,
        timestamp: new Date().toISOString(),
        data: []
      };

      switch (type) {
        case 'user':
          mockData.data = this.generateUserData(count, options);
          break;
        case 'load':
          mockData.data = this.generateLoadData(count, options);
          break;
        case 'carrier':
          mockData.data = this.generateCarrierData(count, options);
          break;
        case 'driver':
          mockData.data = this.generateDriverData(count, options);
          break;
        case 'shipment':
          mockData.data = this.generateShipmentData(count, options);
          break;
        case 'invoice':
          mockData.data = this.generateInvoiceData(count, options);
          break;
        default:
          mockData.data = this.generateGenericData(count, options);
      }

      await this.logActivity('mock_data_generated', mockData);
      return mockData;
    } catch (error) {
      await this.logError('generateMockData', error);
      throw error;
    }
  }

  generateUserData(count, options) {
    const users = [];
    const roles = ['shipper', 'carrier', 'broker', 'driver', 'customer'];
    const companies = ['DEMO / PLACEHOLDER Company A', 'DEMO / PLACEHOLDER Company B', 'DEMO / PLACEHOLDER Company C'];

    for (let i = 0; i < count; i++) {
      users.push({
        id: `user_${Date.now()}_${i}`,
        email: `demo.user${i}@placeholder.com`,
        firstName: `DEMO / PLACEHOLDER First${i}`,
        lastName: `DEMO / PLACEHOLDER Last${i}`,
        role: roles[i % roles.length],
        company: companies[i % companies.length],
        status: 'active',
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        lastLogin: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
      });
    }

    return users;
  }

  generateLoadData(count, options) {
    const loads = [];
    const statuses = ['pending', 'assigned', 'in-transit', 'delivered', 'cancelled'];
    const cities = ['DEMO / PLACEHOLDER City A', 'DEMO / PLACEHOLDER City B', 'DEMO / PLACEHOLDER City C'];

    for (let i = 0; i < count; i++) {
      loads.push({
        id: `load_${Date.now()}_${i}`,
        pickupLocation: `${cities[i % cities.length]}, DEMO / PLACEHOLDER State`,
        deliveryLocation: `${cities[(i + 1) % cities.length]}, DEMO / PLACEHOLDER State`,
        pickupDate: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        deliveryDate: new Date(Date.now() + Math.random() * 14 * 24 * 60 * 60 * 1000).toISOString(),
        weight: Math.floor(Math.random() * 50000) + 1000,
        rate: Math.floor(Math.random() * 5000) + 500,
        status: statuses[i % statuses.length],
        shipperId: `shipper_${i}`,
        carrierId: i % 2 === 0 ? `carrier_${i}` : null,
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
      });
    }

    return loads;
  }

  generateCarrierData(count, options) {
    const carriers = [];
    const companyTypes = ['DEMO / PLACEHOLDER Trucking', 'DEMO / PLACEHOLDER Logistics', 'DEMO / PLACEHOLDER Transport'];

    for (let i = 0; i < count; i++) {
      carriers.push({
        id: `carrier_${Date.now()}_${i}`,
        companyName: `${companyTypes[i % companyTypes.length]} ${i + 1}`,
        mcNumber: `MC${String(Math.floor(Math.random() * 999999)).padStart(6, '0')}`,
        dotNumber: `DOT${String(Math.floor(Math.random() * 999999)).padStart(6, '0')}`,
        contactEmail: `demo.carrier${i}@placeholder.com`,
        contactPhone: `555-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`,
        fleetSize: Math.floor(Math.random() * 100) + 1,
        status: 'active',
        rating: (Math.random() * 2 + 3).toFixed(1),
        createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
      });
    }

    return carriers;
  }

  generateDriverData(count, options) {
    const drivers = [];
    const licenseTypes = ['CDL-A', 'CDL-B', 'CDL-C'];

    for (let i = 0; i < count; i++) {
      drivers.push({
        id: `driver_${Date.now()}_${i}`,
        firstName: `DEMO / PLACEHOLDER Driver${i}`,
        lastName: `DEMO / PLACEHOLDER Last${i}`,
        licenseNumber: `DL${String(Math.floor(Math.random() * 999999999)).padStart(9, '0')}`,
        licenseType: licenseTypes[i % licenseTypes.length],
        phone: `555-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`,
        email: `demo.driver${i}@placeholder.com`,
        carrierId: `carrier_${i % 5}`,
        status: 'active',
        experience: Math.floor(Math.random() * 20) + 1,
        rating: (Math.random() * 2 + 3).toFixed(1),
        createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
      });
    }

    return drivers;
  }

  generateShipmentData(count, options) {
    const shipments = [];
    const statuses = ['pending', 'picked-up', 'in-transit', 'delivered'];

    for (let i = 0; i < count; i++) {
      shipments.push({
        id: `shipment_${Date.now()}_${i}`,
        trackingNumber: `TRK${String(Math.floor(Math.random() * 999999999)).padStart(9, '0')}`,
        loadId: `load_${i}`,
        driverId: `driver_${i}`,
        status: statuses[i % statuses.length],
        pickupDate: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        deliveryDate: new Date(Date.now() + Math.random() * 14 * 24 * 60 * 60 * 1000).toISOString(),
        actualPickupDate: i % 2 === 0 ? new Date().toISOString() : null,
        actualDeliveryDate: i % 3 === 0 ? new Date().toISOString() : null,
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
      });
    }

    return shipments;
  }

  generateInvoiceData(count, options) {
    const invoices = [];
    const statuses = ['draft', 'sent', 'paid', 'overdue'];

    for (let i = 0; i < count; i++) {
      const amount = Math.floor(Math.random() * 10000) + 100;
      invoices.push({
        id: `invoice_${Date.now()}_${i}`,
        invoiceNumber: `INV-${String(Math.floor(Math.random() * 999999)).padStart(6, '0')}`,
        loadId: `load_${i}`,
        amount: amount,
        tax: Math.floor(amount * 0.08),
        total: Math.floor(amount * 1.08),
        status: statuses[i % statuses.length],
        dueDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        paidDate: i % 2 === 0 ? new Date().toISOString() : null,
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
      });
    }

    return invoices;
  }

  generateGenericData(count, options) {
    const data = [];
    
    for (let i = 0; i < count; i++) {
      data.push({
        id: `item_${Date.now()}_${i}`,
        name: `DEMO / PLACEHOLDER Item ${i}`,
        description: `DEMO / PLACEHOLDER Description for item ${i}`,
        value: Math.floor(Math.random() * 1000) + 10,
        status: 'active',
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
      });
    }

    return data;
  }

  async populateTableData(tableId, dataType, count = 10) {
    try {
      const mockData = await this.generateMockData(dataType, count);
      
      const populationResult = {
        tableId,
        dataType,
        count: mockData.data.length,
        timestamp: new Date().toISOString(),
        status: 'FULLY DEPLOYED AND COMMITTED',
        data: mockData.data,
        operations: {
          insert: mockData.data.length,
          update: 0,
          delete: 0
        }
      };

      await this.logActivity('table_data_populated', populationResult);
      return populationResult;
    } catch (error) {
      await this.logError('populateTableData', error);
      throw error;
    }
  }

  async createAPITestData(endpoint, method, dataType, count = 5) {
    try {
      const testData = await this.generateMockData(dataType, count);
      
      const apiTestData = {
        endpoint,
        method,
        dataType,
        count: testData.data.length,
        timestamp: new Date().toISOString(),
        status: 'FULLY DEPLOYED AND COMMITTED',
        testCases: testData.data.map((item, index) => ({
          id: `api_test_${endpoint}_${index}`,
          description: `Test ${method} ${endpoint} with ${dataType} data`,
          requestData: item,
          expectedResponse: {
            status: method === 'POST' ? 201 : 200,
            data: item
          }
        }))
      };

      await this.logActivity('api_test_data_created', apiTestData);
      return apiTestData;
    } catch (error) {
      await this.logError('createAPITestData', error);
      throw error;
    }
  }

  async generateRealisticTestScenarios(portalId) {
    try {
      const scenarios = {
        portalId,
        timestamp: new Date().toISOString(),
        status: 'FULLY DEPLOYED AND COMMITTED',
        scenarios: []
      };

      // High volume scenario
      scenarios.scenarios.push({
        id: 'high_volume_scenario',
        name: 'High Volume Load Processing',
        description: 'Test system with high volume of loads',
        data: {
          loads: await this.generateMockData('load', 1000),
          carriers: await this.generateMockData('carrier', 50),
          drivers: await this.generateMockData('driver', 200)
        },
        expectedBehavior: 'System handles high volume without performance degradation'
      });

      // Edge case scenario
      scenarios.scenarios.push({
        id: 'edge_case_scenario',
        name: 'Edge Case Data Handling',
        description: 'Test system with edge case data',
        data: {
          loads: [
            { ...(await this.generateMockData('load', 1)).data[0], weight: 0 },
            { ...(await this.generateMockData('load', 1)).data[0], weight: 999999 },
            { ...(await this.generateMockData('load', 1)).data[0], rate: -100 }
          ]
        },
        expectedBehavior: 'System handles edge cases gracefully with appropriate validation'
      });

      // Real-time sync scenario
      scenarios.scenarios.push({
        id: 'realtime_sync_scenario',
        name: 'Real-time Data Synchronization',
        description: 'Test real-time data sync across portals',
        data: {
          shipments: await this.generateMockData('shipment', 100),
          updates: Array(50).fill().map(() => ({
            id: `update_${Date.now()}_${Math.random()}`,
            type: 'status_change',
            timestamp: new Date().toISOString(),
            data: { status: 'in-transit' }
          }))
        },
        expectedBehavior: 'All portals receive real-time updates within 2 seconds'
      });

      await this.logActivity('realistic_test_scenarios_generated', scenarios);
      return scenarios;
    } catch (error) {
      await this.logError('generateRealisticTestScenarios', error);
      throw error;
    }
  }
}

module.exports = DataBot;
