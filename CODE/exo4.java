import java.util.List;

public class OrderProcessor {

    private final Database database;
    private final EmailService emailService;
    private final InventorySystem inventorySystem;

    public OrderProcessor() {
        this.database = new Database();
        this.emailService = new EmailService();
        this.inventorySystem = new InventorySystem();
    }

    public void processOrder(Order order) {
        // Vérifier la disponibilité des articles en stock
        verifyItemsAvailability(order);

        // Enregistrer la commande dans la base de données
        database.saveOrder(order);

        // Envoyer un e-mail de confirmation au client
        sendOrderConfirmation(order);

        // Mettre à jour l'inventaire
        updateInventory(order);

        // Appliquer une remise pour les clients fidèles
        applyDiscountIfLoyalCustomer(order);
    }

    private void verifyItemsAvailability(Order order) {
        List<Item> items = order.getItems();
        for (Item item : items) {
            if (!inventorySystem.isItemAvailable(item)) {
                throw new ItemNotAvailableException("Item not available in inventory: " + item.getName());
            }
        }
    }

    private void sendOrderConfirmation(Order order) {
        String message = "Your order has been received and is being processed.";
        emailService.sendEmail(order.getCustomerEmail(), "Order Confirmation", message);
    }

    private void updateInventory(Order order) {
        List<Item> items = order.getItems();
        for (Item item : items) {
            inventorySystem.updateInventory(item, -item.getQuantity());
        }
    }

    private void applyDiscountIfLoyalCustomer(Order order) {
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

class ItemNotAvailableException extends RuntimeException {
    public ItemNotAvailableException(String message) {
        super(message);
    }
}