import java.util.*;
public class OrderProcessor {
    private Database database;
    private EmailService emailService;
    private InventorySystem inventorySystem;
    public OrderProcessor() {
        this.database = new Database();
        this.emailService = new EmailService();
        this.inventorySystem = new InventorySystem();
    }
    public void processOrder(Order order) {
// Vérifier la disponibilité des articles en stock
        List<Item> items = order.getItems();
        for (Item item : items) {
            if (!inventorySystem.isItemAvailable(item)) {
                throw new RuntimeException("Item not available in inventory");
            }
        }
// Enregistrer la commande dans la base de données
        database.saveOrder(order);
// Envoyer un e-mail de confirmation au client
        String message = "Your order has been received and is being processed.";
        emailService.sendEmail(order.getCustomerEmail(), "Order Confirmation", message);
// Mettre à jour l'inventaire
        for (Item item : items) {
            inventorySystem.updateInventory(item, item.getQuantity() * -1);
        }
// Appliquer une remise pour les clients fidèles
        if (order instanceof LoyalCustomerOrder) {
            LoyalCustomerOrder loyalCustomerOrder = (LoyalCustomerOrder) order;
            loyalCustomerOrder.applyDiscount();
        }
    }
}
public class LoyalCustomerOrder extends Order {
    @Override
    public void applyDiscount() {
// Appliquer une remise de 10%
        setTotalPrice(getTotalPrice() * 0.9);
    }
}